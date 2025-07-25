import Image from 'next/image';

const cateringImages = [
  {
    src: '/assets/catering/food1.webp',
    fallbackSrc: '/assets/catering/food1.webp',
    alt: 'Signature Thai Pad See Ew',
    title: 'Signature Pad See Ew',
    description: 'Rich and aromatic Thai curries, perfect for any gathering'
  },
  {
    src: '/assets/catering/food2.webp',
    fallbackSrc: '/assets/catering/food2.webp',
    alt: 'Fried Rice with Shrimp',
    title: 'Fried Rice with Shrimp',
    description: 'Light and refreshing starters to begin your feast'
  },
  {
    src: '/assets/catering/food3.webp',
    fallbackSrc: '/assets/catering/food3.webp',
    alt: 'Thai-Iced Tea',
    title: 'Chilled Thai Iced Tea',
    description: 'Authentic pad thai and other noodle favorites'
  },
  {
    src: '/assets/catering/food4.webp',
    fallbackSrc: '/assets/catering/food4.webp',
    alt: 'Restuarant Vibe',
    title: 'Restuarant Vibe',
    description: 'Warm and inviting atmosphere perfect for gathering with loved ones'
  }
];

export default function CateringGallery() {
  return (
    <div className="py-12 bg-amber-50">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Menu Highlights</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cateringImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <div className="relative h-64 w-full">
                <picture>
                  <source srcSet={image.src} type="image/webp" />
                  <Image
                    src={image.fallbackSrc}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-lg"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 