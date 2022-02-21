import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../assets/icons/github.svg";
import { ReactComponent as Medium } from "../../assets/icons/medium.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://twitter.com/breakchainx" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://www.facebook.com/BreakChainX" target="_blank">
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="22px" height="22px">
          <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
        </svg>
        {/* <SvgIcon color="primary" component={Discord} /> */}
      </Link>

      <Link href=" https://breakchain-protocol.medium.com/" target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="https://github.com/breakchain" target="_blank">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="https://t.me/+HQItttSpH29iZWIx " target="_blank">
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px">
          <path d="M5.83,23.616c12.568-5.529,28.832-12.27,31.077-13.203c5.889-2.442,7.696-1.974,6.795,3.434 c-0.647,3.887-2.514,16.756-4.002,24.766c-0.883,4.75-2.864,5.313-5.979,3.258c-1.498-0.989-9.059-5.989-10.7-7.163 c-1.498-1.07-3.564-2.357-0.973-4.892c0.922-0.903,6.966-6.674,11.675-11.166c0.617-0.59-0.158-1.559-0.87-1.086 c-6.347,4.209-15.147,10.051-16.267,10.812c-1.692,1.149-3.317,1.676-6.234,0.838c-2.204-0.633-4.357-1.388-5.195-1.676 C1.93,26.43,2.696,24.995,5.83,23.616z" />
        </svg>
        {/* <SvgIcon color="primary" component={Discord} /> */}
      </Link>
    </div>
  );
}
