import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "The Unapplauded — A Museum for Ordinary Victories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F0EB",
          fontFamily:
            '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#2C2C2C",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            The Unapplauded
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#8A8A8A",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            A museum for ordinary victories.
          </p>
          <div
            style={{
              marginTop: 16,
              padding: "12px 32px",
              border: "1px solid #E0D8D0",
              borderRadius: 8,
              fontSize: 20,
              color: "#8B7355",
            }}
          >
            写下一件小事，变成一件展品
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
