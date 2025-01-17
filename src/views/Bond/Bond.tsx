import { ChangeEvent, Fragment, ReactNode, ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { t, Trans } from "@lingui/macro";
import { formatCurrency, trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import BondHeader from "./BondHeader";
import BondRedeem from "./BondRedeem";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { Skeleton } from "@material-ui/lab";
import { useAppSelector } from "src/hooks";
import { IAllBondData } from "src/hooks/Bonds";

type InputEvent = ChangeEvent<HTMLInputElement>;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Bond = () => {
  const bond: any = {};
  const history = useHistory();
  const { provider, address, networkId } = useWeb3Context();
  usePathForNetwork({ pathName: "bonds", networkID: networkId, history });

  const [slippage, setSlippage] = useState<number>(0.5);
  const [recipientAddress, setRecipientAddress] = useState<string>(address);

  const [view, setView] = useState<number>(0);
  const [quantity, setQuantity] = useState<number | undefined>();

  const isBondLoading = useAppSelector<boolean>(state => (state.bonding.loading ? state.bonding.loading : false));
  const marketPrice = useAppSelector(state => {
    return state.app.xChainPrice;
  });

  const onRecipientAddressChange = (e: InputEvent): void => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = (e: InputEvent): void => {
    return setSlippage(Number(e.target.value));
  };

  const onClickAway = (): void => {
    history.goBack();
  };

  const onClickModal = (e: any): void => {
    e.stopPropagation();
  };
  useEffect(() => {
    if (address) setRecipientAddress(address);
  }, [provider, quantity, address]);

  const changeView = (event: ChangeEvent<{}>, value: string | number): void => {
    setView(Number(value));
  };

  return (
    <Grid container id="bond-view">
      <Paper className="ohm-card ohm-modal" onClick={onClickModal}>
        <Box display="flex" flexDirection="row" className="bond-price-data-row">
          <div className="bond-price-data">
            <Typography variant="h5" color="textSecondary">
              <Trans>Bond Price</Trans>
            </Typography>
            <Typography variant="h3" className="price" color="primary">
              <>{isBondLoading ? <Skeleton width="50px" /> : <DisplayBondPrice key={bond?.name} bond={bond} />}</>
            </Typography>
          </div>
          <div className="bond-price-data">
            <Typography variant="h5" color="textSecondary">
              <Trans>Market Price</Trans>
            </Typography>
            <Typography variant="h3" color="primary" className="price">
              {isBondLoading ? <Skeleton /> : formatCurrency(Number(marketPrice), 2)}
            </Typography>
          </div>
        </Box>

        <Tabs
          centered
          value={view}
          textColor="primary"
          indicatorColor="primary"
          onChange={changeView}
          aria-label="bond tabs"
        >
          <Tab
            aria-label="bond-tab-button"
            label={t({
              id: "Bond",
              comment: "The action of bonding (verb)",
            })}
            {...a11yProps(0)}
          />
          <Tab aria-label="redeem-tab-button" label={t`Redeem`} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={view} index={0}>
          <BondPurchase bond={bond} slippage={slippage} recipientAddress={recipientAddress} />
        </TabPanel>

        <TabPanel value={view} index={1}>
          <BondRedeem bond={bond} />
        </TabPanel>
      </Paper>
    </Grid>
  );
};

export const DisplayBondPrice = ({ bond }: { bond: IAllBondData }): ReactElement => {
  const { networkId } = useWeb3Context();
  const bondPrice = useAppSelector(state => {
    return state.app && state.app.bondPrice;
  });
  return (
    <Fragment>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(Number(bondPrice))}
    </Fragment>
  );
};

export const DisplayBondDiscount = ({ bond }: { bond: IAllBondData }): ReactNode => {
  const bondROI = useAppSelector(state => {
    return state.app && state.app.bondROI;
  });

  return <Fragment>{bondROI && trim(bondROI, 2)}%</Fragment>;
};
export default Bond;
