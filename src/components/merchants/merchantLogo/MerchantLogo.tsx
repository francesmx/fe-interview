import { Img } from 'react-image';
import cleoCoin from '../../../assets/cleo_coin.jpg';
import loaderGif from '../../../assets/loader.gif';

type MerchantLogoProps = {
  iconUrl: string;
  merchantName: string;
};

// Using react-image's <Img/> tag because it provides a fallback mechanism for failed images
// However - unsure how to use this with styled-components
// At least the CSS is contained within the component :)

export const MerchantLogo: React.FC<MerchantLogoProps> = ({ iconUrl, merchantName }) => {
  return (
    <Img
      src={[iconUrl, cleoCoin]}
      loader={
        <Img
          src={loaderGif}
          style={{
            width: '55px',
            height: '55px',
            padding: '7px',
            marginRight: '10px',
            borderRadius: '50%',
            alignSelf: 'center',
          }}
        />
      }
      alt={`${merchantName} logo`}
      style={{
        width: '55px',
        height: '55px',
        padding: '7px',
        marginRight: '10px',
        borderRadius: '50%',
        alignSelf: 'center',
      }}
    />
  );
};
