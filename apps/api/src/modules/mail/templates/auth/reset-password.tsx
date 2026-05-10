import { Section, Text, Button } from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "../layouts/base-layout";

interface ResetPasswordProps {
  resetLink: string;
}

export const ResetPasswordTemplate = ({ resetLink }: ResetPasswordProps) => (
  <BaseLayout previewText="Reset your password">
    <Section style={content}>
      <Text style={heading}>Reset Your Password</Text>
      <Text style={paragraph}>
        We received a request to reset your password for your Traveloop account. Click the button below to set a new password:
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={resetLink}>
          Reset Password
        </Button>
      </Section>
      <Text style={paragraph}>
        This link will expire in 1 hour. If you did not request a password reset, please ignore this email or contact support if you have concerns.
      </Text>
    </Section>
  </BaseLayout>
);

const content = {
  padding: "0 48px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#484848",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

export default ResetPasswordTemplate;
