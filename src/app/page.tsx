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
                <h3 className="text-3xl font-bold">MENU</h3>
              </a>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="flex">
          <a
            href="/reserve"
            className="flex-1 bg-red-100 text-red-600 py-8 text-center hover:bg-red-200 transition-colors"
          >
            <h3 className="text-2xl font-bold">RESERVE TABLE</h3>
          </a>
          <a
            href="/order"
            className="flex-1 bg-red-600 text-white py-8 text-center hover:opacity-90 transition-opacity"
          >
            <h3 className="text-2xl font-bold">ORDER NOW</h3>
          </a>
        </section>

        {/* Brand Message Section */}
        <section className="relative py-20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/landing/backgrounds/vibe04.webp')" }}
          ></div>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gray-900/70"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 flex flex-col space-y-2">
                <span className="text-red-500">Cozy.</span>
                <span className="text-red-500">Authentic.</span>
                <span className="text-red-500">Freshly made.</span>
              </h2>
              <p className="text-xl text-white mb-8">
                Experience the warmth of Thai hospitality in every dish we serve.
                Our restaurant is more than just a place to eat – it&apos;s where
                memories are made and traditions are shared.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-100">
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
        <section className="relative py-20">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
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
              <h2 className="text-4xl font-bold mb-6">Catering Services</h2>
              <p className="text-xl mb-8">
                Let us bring the authentic taste of Thailand to your special events.
                From corporate gatherings to family celebrations, we create memorable
                dining experiences with our catering services.
              </p>
              <a
                href="/catering"
                className="inline-block bg-white text-red-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Learn More About Catering
              </a>
            </div>
          </div>
        </section>

        {/* Catering Gallery */}
        <CateringGallery />

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Welcome to KINN THAI</h2>
                <p className="text-gray-600 mb-4">
                  Experience the authentic flavors of Thailand in a warm and welcoming atmosphere.
                </p>
                <p className="text-gray-600 mb-4">
                  Our chefs bring traditional recipes to life using the freshest ingredients.
                </p>
                <a
                  href="/about"
                  className="text-red-600 font-medium hover:underline"
                >
                  Learn more about us →
                </a>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Address:</strong><br />
                    123 Thai Street<br />
                    City, State 12345
                  </p>
                  <p className="text-gray-600">
                    <strong>Hours:</strong><br />
                    Monday - Friday: 11:00 AM - 10:00 PM<br />
                    Saturday - Sunday: 12:00 PM - 11:00 PM
                  </p>
                  <p className="text-gray-600">
                    <strong>Phone:</strong><br />
                    (123) 456-7890
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Map Placeholder */}
              <div className="h-[400px] bg-gray-200 rounded-lg relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Google Maps Integration
                </div>
              </div>

              {/* Location Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Find Us</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p className="text-gray-600">
                      123 Thai Street<br />
                      City, State 12345
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Hours</h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div>Monday - Friday</div>
                      <div>11:00 AM - 10:00 PM</div>
                      <div>Saturday - Sunday</div>
                      <div>12:00 PM - 11:00 PM</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Contact</h3>
                    <p className="text-gray-600">
                      Phone: (123) 456-7890<br />
                      Email: info@kinthai.com
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com"
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
