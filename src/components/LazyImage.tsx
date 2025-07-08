import { useState, useEffect } from "react";

interface LazyImageProps {
  url: string;
  alt: string;
}

export const LazyImage = ({ url, alt }: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<string>("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div
          className={`opacity-0 absolute h-full z-10 w-full flex items-center justify-center`}
        >
          ...Loading
        </div>
      )}
      <img
        src={url}
        alt={alt}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={`object-contain h-full ${opacity}`}
      />
    </>
  );
};
