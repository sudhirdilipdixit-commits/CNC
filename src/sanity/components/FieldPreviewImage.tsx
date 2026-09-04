import type { FieldProps } from "sanity";

export function withFieldPreview(imageSrc: string, alt: string) {
  return function FieldPreviewImageField(props: FieldProps) {
    const isOn = (props.value as { show?: boolean } | undefined)?.show === true;
    return (
      <div>
        {isOn && (
          <div
            style={{
              marginBottom: 12,
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid var(--card-border-color, #e3e3e3)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={alt} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        )}
        {props.renderDefault(props)}
      </div>
    );
  };
}
