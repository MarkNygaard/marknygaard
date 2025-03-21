import { SRCImage } from 'react-datocms';

type ResponsiveImageProps = {
  coverImage: any;
  priority?: boolean;
};

export default function ResponsiveImage({
  coverImage,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <>
      {/* Desktop Image */}
      <div className='hidden lg:block'>
        <SRCImage data={coverImage.desktop} priority={priority} />
      </div>
      {/* Tablet Image */}
      <div className='hidden md:block lg:hidden'>
        <SRCImage data={coverImage.tablet} priority={priority} />
      </div>
      {/* Mobile Image */}
      <div className='hidden sm:block md:hidden'>
        <SRCImage data={coverImage.mobile430} priority={priority} />
      </div>
      {/* Small Mobile Image */}
      <div className='sm:hidden'>
        <SRCImage data={coverImage.mobile390} priority={priority} />
      </div>
    </>
  );
}
