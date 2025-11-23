// ASSETS
  const socialLinkImg = '/assets/img/social-links-section.avif';

type Props = {
  isEn?: boolean;
}

export default function Instructions ({ isEn = true }: Props) {
  
  if (isEn) return (
    <section
      className="flex flex-col gap-4"
    >
      <h2
        className="text-heading text-lg font-semibold"
      >
        Instructions
      </h2>
      <h3
        className="text-heading font-semibold"
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
          <span className="text-heading font-semibold">Add: </span>
          Click "Add New Link", selsect a platform, and enter your full profile URL.
        </li>
        <li>
          <span className="text-heading font-semibold">Edit: </span>
          Links can't be edited once it's created. Please delete the existing link and create a new one.
        </li>
        <li>
          <span className="text-heading font-semibold">Remove: </span>
          Click the delete icon to remove a link. This action is immediate.
        </li>
      </ul>
      <p className="text-body"><span className="text-content font-semibold">Tip: </span>Always use the full URL (e.g., https://www.instagram.com/yourusername) to esnure the links work correctly.</p>
      <div
        className="flex w-full justify-center"
      >
        <img 
          className="w-[500px] h-auto object-cover object-center rounded-lg"
          src={socialLinkImg}
        />
      </div>
    </section>
  )

  return (
    <section
      className="flex flex-col gap-4"
    >
      <h2
        className="text-heading text-lg font-semibold"
      >
        التعليمات
      </h2>
      <h3
        className="text-heading font-semibold"
      >
        إدارة روابطك الاجتماعية
      </h3>
      <p
        className="text-heading"
      >
        قم بربط متجرك الإلكتروني بحساباتك على وسائل التواصل الاجتماعي. أضف، حرّر، أو احذف الروابط الاجتماعية التي تظهر على موقعك (مثل الهيدر، الفوتر، أو صفحة الاتصال).
      </p>
      <ul className="text-body list-disc px-4 leading-6" style={{direction: 'rtl', textAlign: 'right'}}>
        <li>
          <span className="text-heading font-semibold">إضافة: </span>
          انقر على "إضافة رابط جديد"، اختر المنصة، وأدخل رابط حسابك الكامل.
        </li>
        <li>
          <span className="text-heading font-semibold">تعديل: </span>
          لا يمكن تعديل الروابط بعد إنشائها. يرجى حذف الرابط الحالي وإنشاء رابط جديد.
        </li>
        <li>
          <span className="text-heading font-semibold">حذف: </span>
          انقر على أيقونة الحذف لإزالة الرابط. هذا الإجراء فوري.
        </li>
      </ul>
      <p className="text-body" style={{direction: 'rtl', textAlign: 'right'}}><span className="text-content font-semibold">نصيحة: </span>استخدم دائمًا الرابط الكامل (مثال: https://www.instagram.com/اسم المستخدم) لضمان عمل الروابط بشكل صحيح.</p>
      <div
        className="flex w-full justify-center"
      >
        <img 
          className="w-[500px] h-auto object-cover object-center rounded-lg"
          src={socialLinkImg}
          alt="روابط اجتماعية"
        />
      </div>
    </section> 
  )
}