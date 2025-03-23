export const MailUIs = () => {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-xl border px-8 py-8">
      <h2 className="mb-4 text-center">
        <a href="https://www.entomoninstitute.com/" target="_blank" rel="noopener noreferrer">
          <span className="text-balance text-xl font-bold">Entomon Institute of Invertebrate Zoology</span>
        </a>
      </h2>
      <img
        src="https://wallpapercat.com/w/full/2/d/7/1044282-1920x1080-desktop-1080p-beetle-background-image.jpg"
        alt="Entomon_Institute"
        className="mb-6 h-48 w-full rounded-lg object-cover object-center"
      />
      <h3 className="mb-6 border-b border-current text-center">Registration Confirmation</h3>
      <p>Thank you for registering! Please confirm your email address to complete your registration.</p>
      <a href="${confirmLink}">Confirm Email</a>
      <p>If you did not sign up, please ignore this email or contact support.</p>
    </div>
  );
};
