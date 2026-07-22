import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #006FCD, #E01E26)",
        }}
      >
        <div
          style={{
            width: 28,
            height: 20,
            borderRadius: 10,
            background: "#050505",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
