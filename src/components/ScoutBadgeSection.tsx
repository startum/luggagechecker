const ScoutBadgeSection = () => {
  return (
    <section className="py-10 sm:py-15 md:py-20 bg-gray-50 flex justify-center items-center">
      <div className="layout-container text-center">
        <a 
          href="https://scoutforge.net/reviews/sizemybag/" 
          title="Trusted and reviewed by Scout Forge"
          className="inline-block"
        >
          <img 
            src="https://scoutforge.net/wp-content/themes/wp-theme/assets/img/badges/badge-light.webp" 
            style={{ maxWidth: '300px' }} 
            alt="Trusted and Reviewed by Scout Forge" 
            className="mx-auto"
          />
        </a>
      </div>
    </section>
  );
};

export default ScoutBadgeSection;