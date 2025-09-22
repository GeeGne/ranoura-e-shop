// COMPONENTS
import Facebook from '@/components/svgs/Facebook';
import Instagram from '@/components/svgs/Instagram';
import Telegram from '@/components/svgs/Telegram';
import Phone from '@/components/svgs/Phone';
import Email from '@/components/svgs/Email';

const iconMap = {
  facebook :Facebook,
  instagram :Instagram,
  telegram :Telegram,
  phone :Phone,
  email :Email
};

type Props = {
  icon: keyof typeof iconMap;
};

export default function SocialIcon ({ icon, ...props }: Props) {

  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    return null;
  };
  
  return (
    <IconComponent 
      { ...props }
    />
  )
}