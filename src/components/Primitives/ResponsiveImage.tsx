import { SRCImage } from 'react-datocms';

type ResponsiveImageProps = {
  coverImage: any;
  priority?: boolean;
  imgStyle?: React.CSSProperties;
};

export default function ResponsiveImage({
  coverImage,
  imgStyle,
}: ResponsiveImageProps) {
  return (
    <>
      {/* Desktop Image */}
      <div className='hidden lg:block'>
        <SRCImage data={coverImage.desktop} imgStyle={imgStyle} />
      </div>
      {/* Tablet Image */}
      <div className='hidden md:block lg:hidden'>
        <SRCImage data={coverImage.tablet} imgStyle={imgStyle} />
      </div>
      {/* Mobile Image */}
      <div className='hidden sm:block md:hidden'>
        <SRCImage data={coverImage.mobile430} imgStyle={imgStyle} />
      </div>
      {/* Small Mobile Image */}
      <div className='sm:hidden'>
        <SRCImage data={coverImage.mobile390} imgStyle={imgStyle} />
      </div>
    </>
  );
}
