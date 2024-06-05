import React from 'react';

import FacebookIcon from './facebook';
import GithubIcon from './github';
import LinkedinIcon from './linkedin';
import LogoIcon from './logo';
import MailIcon from './mail';
import MoonIcon from './moon';
import SunIcon from './sun';

function Icon(props: any) {
  switch (props.symbol) {
    case 'linkedin':
      return <LinkedinIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'github':
      return <GithubIcon />;
    case 'mail':
      return <MailIcon />;
    case 'sun':
      return <SunIcon />;
    case 'moon':
      return <MoonIcon />;
    case 'logo':
      return <LogoIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
