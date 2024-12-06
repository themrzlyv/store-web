"use client";

import { cn } from "@/lib/utils";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useState } from "react";

export function Img(props: ImageProps) {
  const [errored, setErrored] = useState<boolean>(false);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      placeholder={
        typeof props.src !== "string"
          ? (props.src as StaticImageData).blurDataURL
            ? "blur"
            : props.placeholder
          : props.placeholder
      }
      className={cn("object-cover object-center", props.className)}
      loading={!props.priority ? "lazy" : undefined}
      decoding={"async"}
      onError={() => {
        setErrored(true);
      }}
      unoptimized={errored || props.unoptimized}
    />
  );
}
