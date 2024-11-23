import React from "react";
import Image from "next/image";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Flex } from "@yamada-ui/react";
import { TrackItem, AudioAnalysis } from "@/interfaces/spotifyInterface";
import { pitchToNote } from "@/functions/spotify/pitchToNote";
import { popularity } from "@/functions/spotify/popularity";
import { useState, useEffect } from "react";
interface TrackCardProps {
  item: TrackItem;
  data: AudioAnalysis;
}

export const TrackCard: React.FC<TrackCardProps> = ({ item, data }) => {
  const [maxWidth, setMaxWidth] = useState(300); // 初期値を400pxに設定
  const [minWidth, setMinWidth] = useState(300); // 初期値を300pxに設定

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setMinWidth(268); // 幅が600px未満の場合は300pxに設定
        setMaxWidth(268); // 幅が600px未満の場合は300pxに設定
      } else {
        setMaxWidth(425); // それ以外は400pxに設定
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初回実行

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setMaxWidth]);

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: `${maxWidth}px`,
        minWidth: `${minWidth}px`,
        height: "auto",
        marginBottom: "20px",
        backgroundColor: "gray",
        borderRadius: "1.5rem",
      }}
    >
      <CardContent>
        <Box sx={{ width: "100%", maxHeight: "30rem", overflow: "hidden" }}>
          <a href={item.album.uri} style={{ objectFit: "cover" }}>
            <Image
              src={item.album.images[0].url}
              alt={item.name}
              width={300}
              height={300}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10%",
                margin: "0 auto 20px auto",
              }}
            />
          </a>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "60%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            <a href={item.album.uri}>{item.name}</a>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxWidth: "60%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <a href={item.album.artists[0].uri}>{item.artists[0].name}</a>
          </Typography>
        </Box>
        <Box borderBottom={"1px solid black"} margin={"10px 0"} />
        <Flex justifyContent={"space-between"} marginBottom={8}>
          <Box>
            <Typography variant="body2" color="black">
              BPM
            </Typography>
            <Typography variant="body2" color="black">
              {data?.track?.tempo?.toFixed(1) || "N/A"}{" "}
              {"T" + data?.track?.time_signature + "/4" || "N/A"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="black">
              Key{" "}
              <Typography variant="body2" color="black" component={"span"}>
                {pitchToNote(data?.track?.key) || "N/A"}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color={
                typeof data?.track?.key_confidence === "number"
                  ? data?.track?.key_confidence * 100 >= 70
                    ? "green"
                    : data?.track?.key_confidence * 100 >= 40
                      ? "blue"
                      : "black"
                  : "black"
              }
            >
              Valid:{" "}
              {typeof data?.track?.key_confidence === "number"
                ? (data?.track?.key_confidence * 100).toFixed(0)
                : "N/A"}
              %
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="black">
              Popularity
            </Typography>
            <Typography
              variant="body2"
              color={
                item.popularity >= 70
                  ? "green"
                  : item.popularity >= 40
                    ? "blue"
                    : "black"
              }
            >
              {popularity(item.popularity)}
            </Typography>
          </Box>
        </Flex>
      </CardContent>
      <audio controls src={item.preview_url || ""} style={{ width: "100%" }} />
    </Card>
  );
};
