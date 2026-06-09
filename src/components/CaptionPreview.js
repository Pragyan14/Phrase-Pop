export function CaptionPreview({ primaryColor, fontSize, previewBgColor, outlineColor, landscape = false }) {
    const textShadow = [
        `-1px -1px 0 ${outlineColor}`,
        `1px -1px 0 ${outlineColor}`,
        `-1px 1px 0 ${outlineColor}`,
        `1px 1px 0 ${outlineColor}`,
    ].join(', ');

    return (
        <div
            className="w-full rounded-xl relative overflow-hidden"
            style={{
                background: previewBgColor,
                aspectRatio: landscape ? '16/9' : '9/16',
            }}
        >
            <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    bottom: landscape ? '16px' : '64px',
                    color: primaryColor,
                    fontSize: fontSize,
                    textShadow,
                    whiteSpace: 'nowrap',
                }}
            >
                Dummy
            </div>
        </div>
    );
}