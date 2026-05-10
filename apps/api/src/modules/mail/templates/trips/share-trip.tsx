import { Section, Text, Button } from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "../layouts/base-layout";

interface ShareTripProps {
  senderName: string;
  tripTitle: string;
  shareLink: string;
}

export const ShareTripTemplate = ({ senderName, tripTitle, shareLink }: ShareTripProps) => (
  <BaseLayout previewText={`${senderName} shared a trip with you!`}>
    <Section style={content}>
      <Text style={heading}>Adventure Awaits!</Text>
      <Text style={paragraph}>
        Hi there! <strong>{senderName}</strong> has shared a trip with you on Traveloop.
      </Text>
      <Text style={paragraph}>
        Trip: <strong>{tripTitle}</strong>
      </Text>
      <Section style={buttonContainer}>
        <Button style={button} href={shareLink}>
          View Itinerary
        </Button>
      </Section>
      <Text style={paragraph}>
        Explore the planned stops, activities, and budget for this upcoming journey.
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
  backgroundColor: "#f59e0b",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

export default ShareTripTemplate;
