const CONTENT = {
  // UI Labels
  ui: {
    nav_bio: { en: "Biography", fr: "Biographie" },
    nav_practice: { en: "Where to find me", fr: "Où me trouver" },
    nav_services: { en: "Services", fr: "Services" },
    nav_blog: { en: "Blog", fr: "Blog" },
    nav_about: { en: "About Me", fr: "À propos" },
    btn_background: { en: "About me", fr: "À propos de moi" },
    btn_contact: { en: "Contact", fr: "Me Contacter" },
    btn_book: { en: "Book an Appointment", fr: "Prendre Rendez-vous" },
    telehealth_badge: { en: "Telehealth", fr: "Téléconsultation" },
    read_more: { en: "Read Article", fr: "Lire l'article" },
    back_blog: { en: "Back to Blog", fr: "Retour au blog" },
  },

  titles: {
    name: "Lucie RAMET",
    role: {
      en: "Chartered Psychologist<br>CBT & ACT Therapist",
      fr: "Psychologue Clinicienne<br>Thérapeute TCC et ACT",
    },
  },

  form: {
    title: { en: "Contact Me", fr: "Me Contacter" },
    lbl_email: { en: "Your Email", fr: "Votre Email" },
    lbl_availability: {
      en: "Preferred Days/Time",
      fr: "Jours/Heure Préférés",
    },
    lbl_type: { en: "Consultation Type", fr: "Type de Consultation" },
    opt_online: { en: "Online", fr: "En ligne" },
    opt_inperson: { en: "In-Person", fr: "En Personne" },
    lbl_message: { en: "Message", fr: "Message" },
    btn_submit: { en: "Send Request", fr: "Envoyer" },
    btn_close: { en: "Close", fr: "Fermer" },
  },

  summary: {
    en: `
        <h3 class="section-subtitle">CBT and ACT Therapy in French and English</h3>
        <p>I provide short and long-term support for adolescents (16+) and adults, both in-person in Brighton (United Kingdom) and online for Expats and French speakers.</p>
        <p>As a French Clinical Psychologist, I have had the privilege of residing a few years in the United States, Canada, and living and practicing in Singapore, before settling in the UK.</p>
        <p>Now settled in Brighton, I draw upon this wealth of experiences and interactions to provide you with compassionate and personalized support, respectful of your identity and life journey.</p>
        `,
    fr: `
        <h3 class="section-subtitle">Thérapie TCC et ACT en Français et en Anglais</h3>
        <p>Je propose des consultations en personne à Brighton (Royaume-Uni) et en ligne pour les expatriés et les francophones.</p>
        <p>Psychologue Clinicienne Française, j'ai eu le privilège de résider quelques années aux Etats-Unis, au Canada, et plus récemment de vivre et de pratiquer à Singapour.</p>
        <p>Aujourd'hui installée à Brighton, au Royaume-Uni, j'utilise cette richesse d'expériences et de rencontres pour vous proposer un accompagnement bienveillant et personnalisé, respectueux de votre identité et de votre histoire de vie.</p>
        `,
  },

  about: {
    title: { en: "About Me", fr: "À propos de moi" },

    education: {
      en: `
                <h3 class="about-subtitle">Education and training</h3>
                <p>I am a <strong>French Clinical Psychologist</strong> with a Bachelor's and a Master's of Science degree in Clinical Psychology and Psychopathology from the University of Paris Cité.</p>
                <p>I also received a certification in <strong>Cognitive and Behavioral Therapy (CBT)</strong> after three years of training at the French Association for Cognitive-Behavioral Therapy (AFTCC).</p>
                <p>Furthermore, I have pursued extensive training in <strong>Acceptance and Commitment Therapy (ACT)</strong> and acquired skills in <strong>Dialectical Behavior Therapy (DBT)</strong>.</p>
            `,
      fr: `
                <h3 class="about-subtitle">Formation</h3>
                <p>Je suis diplômée d'une licence et d'un <strong>master de Psychologie Clinique et Psychopathologie</strong> de l'Université Paris Cité.</p>
                <p>Dans le but de compléter ma formation initiale, j'ai obtenu une qualification spécialisée en <strong>Thérapie Comportementale et Cognitive (TCC)</strong> après trois années de formation à l'AFTCC.</p>
                <p>De plus, j'ai également été formée à la <strong>Thérapie d'Acceptation et d'Engagement (ACT)</strong> et j'ai acquis des compétences en <strong>Thérapie Comportementale Dialectique (DBT)</strong>.</p>
            `,
    },

    experience: {
      en: `
                <h3 class="about-subtitle">Experience</h3>
                <p>I have over 10 years of experience in <strong>public and private health sectors</strong> across France, Singapore, and the UK. My background includes conducting assessments for severe psychiatric disorders at the Hospital of Versailles and designing interventions for adolescents with developmental disorders.</p>
                <p>In <strong>private practice</strong>, I support people of all ages struggling with anxiety, depression, grief, and identity questioning. I practice in French and English, supporting patients from diverse cultural backgrounds.</p>
                <p>Since moving to <strong>Brighton</strong> in 2023, I receive clients at <strong>Brighton and Hove Psychotherapy</strong> and continue to offer online consultations for patients living in Europe and Asia via The Other Clinic.</p>
            `,
      fr: `
                <h3 class="about-subtitle">Expérience</h3>
                <p>Avec plus de 10 ans d'expérience dans les secteurs public et privé en France et à l'international, j'ai accompagné des patients aux profils variés, notamment à l'Hôpital de Versailles auprès de patients souffrant de troubles psychiatriques sévères.</p>
                <p>En <strong>cabinet libéral</strong>, je soutiens des personnes souffrant d'anxiété, de dépression ou de questionnements identitaires. Ayant exercé en France, à Singapour et au Royaume-Uni, je suis habituée aux contextes multiculturels.</p>
                <p>Installée à <strong>Brighton</strong> depuis 2023, je reçois au cabinet <strong>Brighton and Hove Psychotherapy</strong> et propose des consultations en ligne pour les patients résidant en Europe et en Asie.</p>
            `,
    },

    // STRUCTURED AFFILIATIONS LIST
    affiliations: {
      title: {
        en: "Professional Affiliation",
        fr: "Affiliation professionnelle",
      },
      list: [
        {
          logo: "media/logo_bps.png",
          role: {
            en: "Chartered Member CPsychol 716681",
            fr: "Chartered Member CPsychol 716681",
          },
          org: {
            en: "British Psychological Society (BPS)",
            fr: "British Psychological Society (BPS)",
          },
          location: { en: "United Kingdom", fr: "Royaume-Uni" },
          date: { en: "Since 2023", fr: "Depuis 2023" },
        },
        {
          logo: "media/logo_sps.png",
          role: { en: "Full Member FM022016A", fr: "Full Member FM022016A" },
          org: {
            en: "Singapore Psychological Society (SPS)",
            fr: "Société de Psychologie de Singapour (SPS)",
          },
          location: { en: "Singapore", fr: "Singapour" },
          date: { en: "Since 2021", fr: "Depuis 2021" },
        },
        {
          logo: "media/logo_aftcc.png",
          role: {
            en: "Registered Therapist Practitioner",
            fr: "Thérapeute Praticien TCC",
          },
          org: {
            en: "French Association for Behavioural and Cognitive Therapy (AFTCC)",
            fr: "Association Française de Thérapie Comportementale et Cognitive (AFTCC)",
          },
          location: { en: "France", fr: "France" },
          date: { en: "Since 2014", fr: "Depuis 2014" },
        },
        {
          logo: "media/logo_acbs.jpg",
          role: {
            en: "Professional Member ‑ ACT Practitioner",
            fr: "Professional Member ‑ Praticien ACT",
          },
          org: {
            en: "Association for Contextual Behavioral Science (ACBS)",
            fr: "Association pour les Sciences Comportementales et Contextuelles (ACBS)",
          },
          location: { en: "Intl, UK Chapter", fr: "Intl, UK Chapter" },
          date: { en: "Since 2023", fr: "Depuis 2023" },
        },
        {
          logo: "media/logo_universite.png",
          role: { en: "Alumni Member", fr: "Membre Alumni" },
          org: {
            en: "Université Paris Cité Alumni",
            fr: "Université Paris Cité Alumni",
          },
          location: { en: "France", fr: "France" },
          date: { en: "Alumni", fr: "Alumni" },
        },
      ],
      footer: {
        en: "I have been engaged in weekly supervision continuously since graduation, with professionals trained in CBT and/or ACT.",
        fr: "Je suis en supervision clinique hebdomadaire depuis 2015 avec des professionnels formés aux TCC et à ACT.",
      },
    },

    timeline: [
      {
        location: { en: "New York", fr: "New York" },
        year: { en: "2007-2009", fr: "2007-2009" },
        desc: { en: "Lived in New York", fr: "Vie à New York" },
        top: 32,
        left: 19,
        labelPos: "top",
      },
      {
        location: { en: "Paris", fr: "Paris" },
        year: { en: "2009-2018", fr: "2009-2018" },
        desc: {
          en: "Studied at the University of Paris Cité, worked for 4 years at the 'Hopital du Chesnay'",
          fr: "Études à l'Université Paris Cité, psychologue à l'Hôpital du Chesnay",
        },
        top: 24,
        left: 44,
      },
      {
        location: { en: "Singapore", fr: "Singapour" },
        year: { en: "2018-2022", fr: "2018-2022" },
        desc: {
          en: "Worked at Thrive Family, The Other Clinic in Singapore",
          fr: "Thrive Family, The Other Clinic à Singapour",
        },
        top: 60,
        left: 75,
      },
      {
        location: { en: "Brighton", fr: "Brighton" },
        year: { en: "2022-present", fr: "2022-présent" },
        desc: {
          en: "Brighton & Hove Therapy in Brighton, UK",
          fr: "Brighton & Hove Therapy à Brighton, UK",
        },
        top: 18,
        left: 43,
        labelPos: "top",
      },
    ],
  },

  practice: {
    title: { en: "Where to find me", fr: "Où me trouver" },
    in_person_title: { en: "In-person", fr: "En personne" },
    in_person_desc: {
      en: "I receive clients in person on Wednesdays and Fridays at:",
      fr: "Je reçois les patients en personne les mercredis et vendredis à :",
    },
    location_name: {
      en: "Brighton and Hove Psychotherapy",
      fr: "Brighton and Hove Psychotherapy",
    },
    address_lines: {
      en: ["49 Church Road", "Hove, BN3 2BE", "East Sussex", "United Kingdom"],
      fr: ["49 Church Road", "Hove, BN3 2BE", "East Sussex", "Royaume-Uni"],
    },
    contact_email: "info@lucietherapy.com",
    contact_web: "www.brightonandhovepsychotherapy.com",
    online_title: { en: "Online", fr: "En ligne" },
    online_desc: {
      en: "I previously worked in Singapore with The Other Clinic, and I continue this collaboration by offering telehealth sessions for clients based in Singapore or those who have relocated to Europe.",
      fr: "J'ai travaillé auparavant à Singapour avec The Other Clinic, et je continue cette collaboration en proposant des sessions de téléconsultation pour les clients basés à Singapour ou ceux qui ont déménagé en Europe.",
    },
    online_sub: {
      en: "For clients based in Singapore: I offer telehealth sessions 4-9pm SGT.",
      fr: "Pour les clients basés à Singapour : sessions de 16h à 21h SGT.",
    },
    sg_contact: "hello@theotherclinic.sg",
    sg_web: { en: "Web — The Other Clinic", fr: "Web — The Other Clinic" },
    sg_web_url: "https://theotherclinic.sg",
  },

  services: {
    title: { en: "Services", fr: "Services" },
    fees_title: { en: "Fees & Appointments", fr: "Tarifs & Rendez-vous" },
    fees_desc: {
      en: "Individual session (50 mins): £90",
      fr: "Séance individuelle (50 mins) : 90£",
    },
    insurance: {
      en: "",
      fr: "",
    },
    cards: [
      {
        title: {
          en: "CBT — Cognitive Behavioural Therapy",
          fr: "TCC — Thérapie Cognitivo-Comportementale",
        },
        desc: {
          en: "Practical, skills-focused approach to understand and change patterns that cause distress.",
          fr: "Approche pratique axée sur les compétences pour comprendre et modifier les schémas qui causent de la détresse.",
        },
        img: "img_cbt.jpg",
        blogPostId: "post-what-is-cbt",
      },
      {
        title: {
          en: "ACT — Acceptance & Commitment Therapy",
          fr: "ACT — Thérapie d'Acceptation et d'Engagement",
        },
        desc: {
          en: "Mindfulness and values-based work to help you live a meaningful life alongside difficult thoughts and feelings.",
          fr: "Travail basé sur la pleine conscience et les valeurs pour vous aider à vivre une vie pleine de sens, malgré les pensées et sentiments difficiles.",
        },
        img: "img_act.webp",
        blogPostId: "post-core-principles-act",
      },
      {
        title: {
          en: "Supervision & Consultancy",
          fr: "Supervision & Consultation",
        },
        desc: {
          en: "Reflective, supportive supervision for practitioners and trainees, focusing on growth and clinical confidence.",
          fr: "Supervision réflexive et solidaire pour les praticiens et stagiaires, axée sur la croissance et la confiance clinique.",
        },
        img: "img_supervision.webp",
        blogPostId: "post-why-supervision-matters",
      },
      {
        title: { en: "Support for Expats", fr: "Soutien aux Expatriés" },
        desc: {
          en: "Specialized support for navigating cultural adjustments, identity shifts, and the unique challenges of living abroad.",
          fr: "Soutien spécialisé pour naviguer dans les ajustements culturels et les défis uniques de la vie à l'étranger.",
        },
        img: "img_expat.jpg",
        blogPostId: "post-navigating-expat-life",
      },
      {
        title: { en: "Online Therapy", fr: "Thérapie en Ligne" },
        desc: {
          en: "Flexible, secure video sessions allowing you to access therapy from the comfort of your own space.",
          fr: "Séances vidéo flexibles et sécurisées vous permettant d'accéder à la thérapie depuis le confort de votre espace.",
        },
        img: "img_telehealth.png",
      },
      {
        title: { en: "Transition to Uni", fr: "Transition vers l'Université" },
        desc: {
          en: "Guidance for young adults managing academic pressure, independence, and the social challenges of university life.",
          fr: "Accompagnement des jeunes adultes face à la pression académique, l'indépendance et la vie sociale universitaire.",
        },
        img: "img_university.jpeg",
      },
    ],
  },

  blog: [
    {
      id: "post-what-is-cbt",
      date: "2026-01-05",
      img: "blog_cbt.jpg",
      title: {
        en: "What is Cognitive Behavioural Therapy (CBT)?",
        fr: "Qu'est-ce que la Thérapie Cognitivo-Comportementale (TCC) ?",
      },
      content: {
        en: `<p>Cognitive Behavioural Therapy (CBT) is a widely used psychological approach...</p>`,
        fr: `<p>La Thérapie Cognitivo-Comportementale (TCC) est une approche psychologique...</p>`,
      },
    },
    {
      id: "post-understanding-anxiety",
      date: "2024-05-15",
      img: "blog_anxiety.jpg",
      title: {
        en: "Understanding Anxiety: A First Step",
        fr: "Comprendre l'anxiété : Une première étape",
      },
      content: {
        en: `<p>Anxiety is a natural response to stress...</p>`,
        fr: `<p>L'anxiété est une réponse naturelle au stress...</p>`,
      },
    },
    {
      id: "post-core-principles-act",
      date: "2024-04-10",
      img: "blog_act.webp",
      title: {
        en: "The Core Principles of ACT",
        fr: "Les principes fondamentaux de l'ACT",
      },
      content: {
        en: `<p>Acceptance and Commitment Therapy (ACT) is about accepting...</p>`,
        fr: `<p>La Thérapie d'Acceptation et d'Engagement (ACT) consiste à accepter...</p>`,
      },
    },
    {
      id: "post-navigating-expat-life",
      date: "2024-03-22",
      img: "blog_expat.png",
      title: {
        en: "Navigating Expat Life",
        fr: "Naviguer dans la vie d'expatrié",
      },
      content: {
        en: `<p>Moving abroad is an exciting adventure...</p>`,
        fr: `<p>Déménager à l'étranger est une aventure passionnante...</p>`,
      },
    },
    {
      id: "post-why-supervision-matters",
      date: "2024-02-05",
      img: "blog_supervision.jpg",
      title: {
        en: "Why Supervision Matters",
        fr: "Pourquoi la supervision est importante",
      },
      content: {
        en: `<p>For psychologists, supervision is not just a requirement...</p>`,
        fr: `<p>Pour les psychologues, la supervision n'est pas seulement une exigence...</p>`,
      },
    },
  ],
};
