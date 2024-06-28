import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const avatar = {
  transforms: {
    original: [],
    thumb: [{ width: 40, height: 40, aspect_ratio: 1.0, crop: 'thumb' }, { radius: 'max' }, { fetch_format: 'auto' }],
    profile: [{ width: 125, height: 125, aspect_ratio: 1.0 }, { radius: 'max' }, { fetch_format: 'auto' }],
  },
  getDefault: () => ({
    thumb: 'https://res.cloudinary.com/dpya8ss9n/image/upload/v1719523549/members_only/_default/thumb.png',
    profile: 'https://res.cloudinary.com/dpya8ss9n/image/upload/v1719523609/members_only/_default/profile.png',
  }),
  upload: async function (userId, filePath) {
    if (!filePath) return avatar.getDefault();
    try {
      const results = await Promise.all(
        ['original', 'thumb', 'profile'].map((publicId) =>
          cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            folder: `members_only/${userId}`,
            public_id: publicId,
            transformation: avatar.transforms[publicId],
            overwrite: true,
            invalidate: true,
          })
        )
      );
      return results.map((result) => result.secure_url);
    } catch (err) {
      console.error(`Error uploading Images:`, err);
      throw err;
    }
  },
};

const uploadAvatar = avatar.upload;
const getDefaultAvatar = avatar.getDefault;

export { uploadAvatar, getDefaultAvatar };
