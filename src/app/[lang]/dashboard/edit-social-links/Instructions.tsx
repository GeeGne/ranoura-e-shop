// ASSETS
  const socialLinkImg = '/assets/img/social-links-section.avif';

type Props = {
  isEn?: boolean;
}

export default function Instructions ({ isEn = true }: Props) {
  return (
    <section
      className="flex flex-col gap-4"
    >
      <h2
        className="text-heading text-lg font-bold"
      >
        Instructions
      </h2>
      <h3
        className="text-heading font-bold"
      >
        Manage Your Soical links
      </h3>
      <p
        className="text-heading"
      >
        Connect Your online store to your social media presence. Add, edit, or remove the social links that appear on your website (e.g., in the header, footer, or a contact page).
      </p>
      <ul className="text-body list-disc px-4 leading-6">
        <li>
          <span className="text-heading font-bold">Add: </span>
          Click "Add New Link", selsect a platform, and enter your full profile URL.
        </li>
        <li>
          <span className="text-heading font-bold">Edit: </span>
          Click the edit icon next to any existing link to change the platform or URL.
        </li>
        <li>
          <span className="text-heading font-bold">Remove: </span>
          Click the delete icon to remove a link. This action is immediate.
        </li>
      </ul>
      <p className="text-body"><span className="text-content font-bold">Tip: </span>Always use the full URL (e.g., https://www.instagram.com/yourusername) to esnure the links work correctly.</p>
      <div
        className="flex w-full justify-center"
      >
        <img 
          className="w-[500px] h-auto object-cover object-center"
          src={socialLinkImg}
        />
      </div>
    </section>
  )
}