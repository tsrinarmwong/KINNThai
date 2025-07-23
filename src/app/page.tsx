import Navigation from '@/components/Navigation';
import Carousel from '@/components/Carousel';
import CateringGallery from '@/components/CateringGallery';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Carousel Section */}
        <section className="relative">
          <Carousel />
        </section>

        {/* Menu Banner */}
        <section className="bg-stone-50 text-red-600 py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <a
                href="/menu"
                className="text-center hover:opacity-90 transition-opacity"
              >
                <h3 className="text-3xl font-bold">FULL MENU</h3>
              </a>
            </div>
            <div className="flex justify-center mt-2">
              <a
                href="https://www.order.store/store/kinn-thai-eatery/HXR5cnScTn6c2y8zGqEQYw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center hover:opacity-90 transition-opacity"
              >
                <h3 className="text-2xl font-bold">ORDER PICK UP</h3>
              </a>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="flex flex-col md:flex-row">
          <a
            href="https://www.doordash.com/store/kinn-thai-eatery-west-lafayette-34903695/72770630/?pickup=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-red-600 text-white py-8 text-center hover:opacity-90 transition-opacity"
          >
            <h3 className="text-2xl font-bold">ORDER ON DOORDASH</h3>
          </a>
          <a
            href="https://www.ubereats.com/store/kinn-thai-eatery/HXR5cnScTn6c2y8zGqEQYw?srsltid=AfmBOooYd4BQdf7BctwGYP7K4Ox_i4dq5FjVNQ8ClkybKq7lBzieCpap"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-black text-white py-8 text-center hover:opacity-90 transition-opacity"
          >
            <h3 className="text-2xl font-bold">ORDER ON UBEREATS</h3>
          </a>
          <a
            href="https://www.grubhub.com/restaurant/kinn-thai-eatery-100-foundry-dr-west-lafayette/11831040"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-orange-500 text-white py-8 text-center hover:opacity-90 transition-opacity"
          >
            <h3 className="text-2xl font-bold">ORDER ON GRUBHUB</h3>
          </a>
        </section>

        {/* Brand Message Section */}
        <section className="relative py-20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/landing/backgrounds/vibe02.webp')" }}
          ></div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gray-900/80"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 flex flex-col space-y-2 text-white drop-shadow-lg">
                <span className="text-red-500">Cozy.</span>
                <span className="text-red-500">Authentic.</span>
                <span className="text-red-500">Freshly made.</span>
              </h2>
              <p className="text-xl text-gray-100 mb-8 drop-shadow">
                Experience the warmth of Thai hospitality in every dish we serve.
                Our restaurant is more than just a place to eat – it&apos;s where
                memories are made and traditions are shared.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-200">
                <span>Family Recipes</span>
                <span className="hidden md:inline">•</span>
                <span>Fresh Ingredients</span>
                <span className="hidden md:inline">•</span>
                <span>Warm Atmosphere</span>
              </div>
            </div>
          </div>
        </section>

        {/* Catering Section */}
        <section className="relative py-20 bg-gray-100 dark:bg-neutral-700">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gray-900/70 dark:bg-neutral-700/90"></div>
          <picture className="absolute inset-0">
            <source srcSet="/assets/catering/catering-bg.webp" type="image/webp" />
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/assets/catering/catering-bg.webp')" }}
            ></div>
          </picture>

          {/* Content */}
          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Catering Services</h2>
              <p className="text-xl mb-8 text-gray-100 drop-shadow">
                Let us bring the authentic taste of Thailand to your special events.
                From corporate gatherings to family celebrations, we create memorable
                dining experiences with our catering services.
              </p>
              <a
                href="mailto:kinnthai.group@gmail.com"
                className="inline-block bg-white text-red-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors drop-shadow"
              >
                Email to order catering
              </a>
            </div>
          </div>
        </section>

        {/* Catering Gallery */}
        <CateringGallery />

        {/* Main Content */}
        <section className="py-16 bg-white dark:bg-neutral-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to KINN THAI</h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Experience the authentic flavors of Thailand in a warm and welcoming atmosphere.
                </p>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Our chefs bring traditional recipes to life using the freshest ingredients.
                </p>
                <a
                  href="https://www.instagram.com/kinnthai.purdue/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 font-medium hover:underline"
                >
                  Learn more about us →
                </a>
              </div>
              {/* Facebook Page Feed in right column */}
              <div className="flex justify-center md:block">
                <div className="w-full max-w-[340px] h-[500px] bg-gray-200 dark:bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center mx-auto">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/profile.php?id=61572354187457&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="340"
                    height="500"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Facebook Page Feed"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Location Section */}
        <section className="py-16 bg-gray-100 dark:bg-neutral-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Map */}
              <div className="h-[400px] bg-gray-200 dark:bg-neutral-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=100+Foundry+Drive+Ste+17,+West+Lafayette,+IN+47906&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kinn Thai Eatery Location"
                ></iframe>
              </div>

              {/* Location Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Find Us</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Address</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      📍Kinn Thai Eatery | 100 Foundry Drive Ste 17, West Lafayette, IN 47906
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Hours</h3>
                    <div className="text-gray-700 dark:text-gray-200 flex items-center space-x-2">
                      <span className="text-2xl">⏰</span>
                      <span className="font-semibold">EVERYDAY 12PM-10PM</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Contact</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                      {/* Phone: (123) 456-7890<br /> */}
                      Email: kinnthai.group@gmail.com
                    </p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/oFNfiEtA2NnCzbmb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
