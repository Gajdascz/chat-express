// Core
import express from 'express';

// Utils
import { P_PUBLIC } from '../../../utils/constants.js';

export default [express.json(), express.urlencoded({ extended: true }), express.static(P_PUBLIC)];
