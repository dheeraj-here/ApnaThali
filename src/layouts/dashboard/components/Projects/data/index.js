import Tooltip from "@mui/material/Tooltip";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));
    
    // members: (
    //   <SoftBox display="flex" py={1}>
    //     {avatars([
    //       [team1, "Ryan Tompson"],
    //       [team2, "Romina Hadid"],
    //       [team3, "Alexander Smith"],
    //       [team4, "Jessica Doe"],
    //     ])}
    //   </SoftBox>
    // ),
        }