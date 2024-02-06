import './header.scss';
import fccLogo from '../../assets/freeCodeCamp.svg';

const Header = () => {
  return (
    <div className='header'>
      <h4 className='sub-title'>
        A
        <img
          src={fccLogo}
          alt='freeCodeCamp Logo'
          className='fcc-logo'
          title='freeCodeCamp Logo'
        />
        Project
      </h4>
      <h2 className='title'>Random Quote Machine</h2>
    </div>
  );
};

export default Header;
