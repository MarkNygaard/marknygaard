export type Maybe<T> = T | null;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents `true` or `false` values. */
  BooleanType: any;
  CustomData: any;
  /** A ISO 8601 compliant date value */
  Date: any;
  /** A ISO 8601 compliant datetime value */
  DateTime: any;
  /** Represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). */
  FloatType: any;
  /** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  IntType: any;
  ItemId: any;
  JsonField: any;
  MetaTagAttributes: any;
  UploadId: any;
};

export enum ItemStatus {
  draft = 'draft',
  published = 'published',
  updated = 'updated',
}

export type Tag = {
  __typename?: 'Tag';
  attributes?: Maybe<Scalars['MetaTagAttributes']>;
  content?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
};

export type ColorField = {
  __typename?: 'ColorField';
  alpha?: Maybe<Scalars['IntType']>;
  blue?: Maybe<Scalars['IntType']>;
  green?: Maybe<Scalars['IntType']>;
  hex?: Maybe<Scalars['String']>;
  red?: Maybe<Scalars['IntType']>;
};

export type focalPoint = {
  __typename?: 'focalPoint';
  x?: Maybe<Scalars['FloatType']>;
  y?: Maybe<Scalars['FloatType']>;
};

export type ResponsiveImage = {
  __typename?: 'ResponsiveImage';
  alt?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['FloatType'];
  base64?: Maybe<Scalars['String']>;
  bgColor?: Maybe<Scalars['String']>;
  height: Scalars['IntType'];
  sizes: Scalars['String'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  webpSrcSet: Scalars['String'];
  width: Scalars['IntType'];
};

export type UploadVideoField = {
  __typename?: 'UploadVideoField';
  duration: Scalars['Int'];
  framerate: Scalars['Int'];
  mp4Url?: Maybe<Scalars['String']>;
  muxAssetId: Scalars['String'];
  muxPlaybackId: Scalars['String'];
  streamingUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type FileField = {
  __typename?: 'FileField';
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<Maybe<ColorField>>;
  copyright?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['CustomData']>;
  exifInfo?: Maybe<Scalars['CustomData']>;
  filename: Scalars['String'];
  focalPoint?: Maybe<focalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Maybe<Scalars['String']>>;
  tags: Array<Maybe<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};

export type ImageBlockRecord = {
  __typename?: 'ImageBlockRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  updatedAt: Scalars['DateTime'];
};

export type metaTagsFragmentFragment = {
  __typename?: 'Tag';
  attributes?: any | null;
  content?: string | null;
  tag: string;
};
