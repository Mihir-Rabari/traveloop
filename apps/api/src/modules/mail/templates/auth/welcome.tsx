import { Section, Text, Button } from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "../layouts/base-layout";

interface WelcomeProps {
  name: string;
}

export const WelcomeTemplate = ({ name }: WelcomeProps) => (
  <BaseLayout previewText="Welcome to Traveloop!">
    <Section style={content}>
      <Text style={heading}>Welcome to Traveloop, {name}!</Text>
      <Text style={paragraph}>
        We're thrilled to have you on board. Traveloop is designed to make your trip planning seamless, collaborative, and fun.
      </Text>
      <Text style={paragraph}>
        Start by creating your first trip and invite your friends to plan together!
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}>
          Create Your First Trip
        </Button>
      </Section>
      <Text style={paragraph}>
        If you have any questions, feel free to reply to this email.
      </Text>
      <Text style={paragraph}>Happy travels!</Text>
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

export default WelcomeTemplate;
