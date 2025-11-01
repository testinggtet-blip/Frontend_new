import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import numeral from "numeral";

export default function WidgetCard({
  title,
  total,
  live,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  function fShortenNumber(number) {
    const format = number ? numeral(number).format("0.00a") : "";

    return result(format, ".00");
  }
  function result(format, key = ".00") {
    const isInteger = format.includes(key);

    return isInteger ? format.replace(key, "") : format;
  }
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        px: 1,
        py: 1,
        gap: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Typography sx={{ fontSize: 23, color: "black" }}>{title}</Typography>
        {icon && <Box>{icon}</Box>}
      </Box>
      <Box spacing={0} sx={{ justifyContent: "space-evenly", display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "gray" }} variant="p">
            Total
          </Typography>
          <Typography variant="h4">{total}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "gray",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            variant="p"
          >
            <div
              style={{
                height: "10px",
                width: "9px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></div>
            Live
          </Typography>
          <Typography variant="h4">{live}</Typography>
        </Box>
      </Box>
    </Card>
  );
}

WidgetCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
