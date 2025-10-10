import { SVGProps, HTMLProps } from 'react';

// COMPONENTS
import Facebook from '@/components/svgs/Facebook';
import Instagram from '@/components/svgs/Instagram';
import Telegram from '@/components/svgs/Telegram';
import Whatsapp from '@/components/svgs/IconoirWhatsappSolid';
import TwitterX from '@/components/svgs/LineMdTwitterX';
import Tiktok from '@/components/svgs/LineMdTiktok';
import Youtube from '@/components/svgs/LineMdYoutubeFilled';
import Phone from '@/components/svgs/Phone';
import Email from '@/components/svgs/Email';


const iconMap: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  telegram: Telegram,
  whatsapp: Whatsapp,
  twitterX: TwitterX,
  tiktok: Tiktok,
  youtube: Youtube,
  phone: Phone,
  email: Email
};

type Props = {
  icon?: keyof typeof iconMap | any;
  isLoading?: boolean;
} & (SVGProps<SVGSVGElement> & HTMLProps<HTMLDivElement>);

export default function SocialIcon ({ icon = 'facebook', isLoading = false, ...props }: Props) {

  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in iconMap`);
    return null;
  };
  
  if (isLoading) return (
    <div 
      className="--opacity-blink w-6 h-6 bg-background-deep-light rounded-full"
      { ...props }
    />
  )

  return (
    <IconComponent 
      { ...props }
    />
  )
}