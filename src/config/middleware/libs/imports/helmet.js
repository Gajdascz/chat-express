import helmet from 'helmet';

const helm = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // All resources can be only be loaded from the same origin as the page itself
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
    }, // Allows inline images using data uris and images to be loaded from cloudinary
  },
});

export default helm;
