import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-dinstein-orange shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src="/dinestein-logo.png"
              alt="Dinestein Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Dinstein</h1>
            <p className="text-sm text-white">Plan It or Grab It — Dinestein Decides</p>
          </div>
        </div>
      </div>
    </header>
  );
} 