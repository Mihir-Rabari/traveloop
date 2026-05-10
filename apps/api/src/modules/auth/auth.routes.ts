import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.validators";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/resend-otp", authController.resendOtp);
router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

// Protected routes
import { authenticate } from "../../middlewares/auth.middleware";
router.get("/me", authenticate, authController.getMe);

export default router;
