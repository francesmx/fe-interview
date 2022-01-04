import cleoLogo from '../../assets/cleo-logo.svg';

export const Header: React.FC = () => {
  return (
    <header>
      <img src={cleoLogo} alt="Cleo logo" style={{ marginTop: 20 }} />
    </header>
  );
};
