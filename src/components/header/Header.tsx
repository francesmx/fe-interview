import cleoLogo from '../../assets/cleo-logo.png';

export const Header: React.FC = () => {
  return (
    <header>
      <img src={cleoLogo} alt="Cleo logo" style={{ marginTop: 10 }} />
    </header>
  );
};
