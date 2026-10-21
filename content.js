/*
 * All the text of lucietherapy.com, English and French side by side.
 *
 * Edit this file and save it to GitHub: the website rebuilds itself within a
 * couple of minutes. To preview on your own computer first, run
 *     python build.py --serve
 * and open http://localhost:8000
 *
 * How to write text
 *   - Every text has an English (en) and a French (fr) version.
 *   - Short text goes between "double quotes". Inside it, write \" for a quote mark.
 *   - Long text goes between `backticks` and can span several lines. It is
 *     Markdown: **bold**, ### Heading, "- " at the start of a line for a bullet
 *     point, [words to show](/blog/understanding-anxiety/) for a link.
 *     Leave an empty line between paragraphs.
 *   - Every item ends with a comma.
 *   - Lines starting with // are notes like this one; the website ignores them.
 */
const CONTENT = {
  // =========================================================== SETTINGS
  site: {
    url: "https://lucietherapy.com",
    // The first language is the default one, served at lucietherapy.com/
    languages: ["en", "fr"],
  },

  person: {
    name: "Lucie Ramet",
    // Shown under the name at the top of the homepage. <br> is a line break.
    role: {
      en: "Chartered Psychologist<br>CBT & ACT Therapist",
      fr: "Psychologue Clinicienne<br>Thérapeute TCC et ACT",
    },
    email: "info@lucietherapy.com",
    // Image files are in the media/ folder
    photo: "profile.jpg",
    instagram: "https://www.instagram.com/lucie_ramet_psychologist/",
    linkedin: "https://www.linkedin.com/in/lucie-ramet-psychologue/",
  },

  // What Google shows in its search results (the blue headline and grey
  // summary). Never visible on the page itself.
  seo: {
    home: {
      title: {
        en: "Lucie Ramet — Psychologist & CBT/ACT Therapist in Brighton & Hove",
        fr: "Lucie Ramet — Psychologue française en ligne, TCC et ACT",
      },
      description: {
        en: "Chartered psychologist offering CBT and ACT therapy in Hove, Brighton and online, in English and French. Adults and adolescents from 16. AFTCC-certified CBT supervisor.",
        fr: "Psychologue clinicienne française, thérapeute TCC et ACT. Séances en ligne en français pour expatriés et francophones, et en personne à Brighton. Superviseure TPS agréée AFTCC.",
      },
      keywords: {
        en: [
          "psychologist Brighton",
          "therapist Hove",
          "CBT Brighton",
          "ACT therapy Sussex",
          "French speaking psychologist",
        ],
        fr: [
          "psychologue française en ligne",
          "psychologue francophone",
          "thérapie TCC en ligne",
          "psychologue expatriés",
          "supervision TCC",
        ],
      },
    },
    blog: {
      title: {
        en: "Articles on CBT, ACT, Anxiety and Therapy",
        fr: "Articles sur la TCC, l'ACT, l'anxiété et la thérapie",
      },
      description: {
        en: "Articles by a chartered psychologist on cognitive behavioural therapy, acceptance and commitment therapy, anxiety, mindfulness, online therapy, life abroad and clinical supervision.",
        fr: "Articles d'une psychologue clinicienne sur la thérapie cognitivo-comportementale, l'ACT, l'anxiété, la pleine conscience, la thérapie en ligne, l'expatriation et la supervision clinique.",
      },
    },
  },

  // =========================================================== HOMEPAGE

  // The text next to the photo
  intro: {
    title: {
      en: "CBT and ACT Therapy in French and English",
      fr: "Formation et parcours",
    },
    text: {
      en: `
        I provide short and long-term support for adolescents (16+) and adults, both in-person in Brighton (United Kingdom) and online for Expats and French speakers.

        As a French Clinical Psychologist, I have had the privilege of residing a few years in the United States, Canada, and living and practicing in Singapore, before settling in the UK.

        Now settled in Brighton, I draw upon this wealth of experiences and interactions to provide you with compassionate and personalized support, respectful of your identity and life journey.
      `,
      fr: `
        Je suis **psychologue clinicienne**, titulaire d'une licence et d'un master de psychologie clinique et psychopathologie obtenus à l'Université Paris Cité.

        J'ai suivi trois années de formation spécialisée en **Thérapies Cognitives et Comportementales (TCC)** au sein de l'Association Française de Thérapie Comportementale et Cognitive (AFTCC), ainsi qu'une formation approfondie de deux ans en **supervision TCC**.

        Par ailleurs, j'ai poursuivi des formations approfondies en **Thérapie d'Acceptation et d'Engagement (ACT)** et acquis des compétences cliniques en **Thérapie Comportementale Dialectique (TCD / DBT)**.
      `,
    },
  },

  // Where to find me
  practice: {
    title: { en: "Where to find me", fr: "Où me trouver" },
    in_person: {
      title: { en: "In-person & Online", fr: "En personne et en ligne" },
      text: {
        en: "I receive clients in person on Tuesdays, Wednesdays, Thursdays and Fridays at:",
        fr: "Je reçois les patients en personne les mardis, mercredis, jeudis et vendredis à :",
      },
      place: "Brighton and Hove Psychotherapy",
      address: {
        street: "49 Church Road",
        town: "Hove",
        postcode: "BN3 2BE",
        region: "East Sussex",
        country: { en: "United Kingdom", fr: "Royaume-Uni" },
        country_code: "GB",
      },
      website:
        "https://www.brightonandhovepsychotherapy.com/practitioners/lucie-ramet/",
      // Google Maps embed link (Share -> Embed a map -> copy the src)
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.5786738914614!2d-0.17646192323758376!3d50.829398860647895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875854344555555%3A0x123456789!2zNDkgQ2h1cmNoIFJkLCBIb3ZlIEJOMyAyQkUsIFVL!5e0!3m2!1sen!2suk!4v1610000000000!5m2!1sen!2suk",
      // Map pin given to Google
      geo: { lat: 50.829399, lng: -0.176462 },
    },
    online: {
      title: {
        en: "Special collaboration - Asia/Singapore",
        fr: "Collaboration spéciale - Asie/Singapour",
      },
      badge: "The Other Clinic",
      text: {
        en: "I previously worked in Singapore with The Other Clinic, and I continue this collaboration by offering telehealth sessions for clients based in Singapore or those who have relocated to Europe.",
        fr: "J'ai travaillé auparavant à Singapour avec The Other Clinic, et je continue cette collaboration en proposant des sessions de téléconsultation pour les clients basés à Singapour ou ceux qui ont déménagé en Europe.",
      },
      hours: {
        en: "For clients based in Singapore: telehealth sessions from 4 to 9pm SGT.",
        fr: "Pour les clients basés à Singapour : sessions de 16h à 21h SGT.",
      },
      email: "hello@theotherclinic.sg",
      website: "https://theotherclinic.sg/lucie-ramet/",
    },
  },

  // Each card opens the article whose `id` is given in `article`
  services: {
    title: { en: "Services", fr: "Services" },
    cards: [
      {
        article: "post-what-is-cbt",
        image: "img_cbt.jpg",
        title: {
          en: "CBT - Cognitive Behavioural Therapy",
          fr: "TCC - Thérapie Cognitivo-Comportementale",
        },
        text: {
          en: "An evidence-based, goal-oriented approach focused on modifying maladaptive thoughts and behaviours.",
          fr: "Une approche fondée sur des preuves et orientée vers des objectifs, visant la modification des pensées et comportements dysfonctionnels.",
        },
      },
      {
        article: "post-what-is-ACT",
        image: "img_act.webp",
        title: {
          en: "ACT - Acceptance & Commitment Therapy",
          fr: "ACT - Thérapie d'Acceptation et d'Engagement",
        },
        text: {
          en: "An evidence-based approach using acceptance, mindfulness, and values to help you move toward a more meaningful life.",
          fr: "Une approche fondée sur des données scientifiques, utilisant l'acceptation, la pleine conscience et les valeurs pour avancer vers une vie plus porteuse de sens.",
        },
      },
      {
        article: "post-cbt-supervision",
        image: "img_supervision.webp",
        title: { en: "Supervision", fr: "Supervision" },
        text: {
          en: "A collaborative, supportive supervisory relationship to deepen clinical understanding and professional confidence.",
          fr: "Une relation de supervision bienveillante et collaborative pour approfondir votre compréhension clinique et votre confiance professionnelle.",
        },
      },
      {
        article: "post-navigating-expat-life",
        image: "img_expat.jpg",
        title: { en: "Support for Expats", fr: "Soutien aux Expatriés" },
        text: {
          en: "Navigate change, build resilience, and thrive abroad.",
          fr: "Soutien spécialisé pour naviguer les défis de la vie à l'étranger.",
        },
      },
      {
        article: "post-online-therapy",
        image: "img_telehealth.png",
        title: { en: "Online Therapy", fr: "Thérapie en Ligne" },
        text: {
          en: "Flexible online therapy sessions to support your well-being - anytime, anywhere.",
          fr: "Séances de thérapie en ligne, flexibles et bienveillantes, pour soutenir votre bien-être où que vous soyez.",
        },
      },
      {
        article: "Mindfulness",
        image: "img_mindfulness1.jpg",
        title: { en: "Mindfulness", fr: "Mindfulness" },
        text: {
          en: "Practising mindfulness to respond more intentionally rather than reacting automatically.",
          fr: "Pratiquer la pleine conscience pour répondre de manière plus intentionnelle plutôt que de réagir automatiquement.",
        },
      },
    ],
  },

  fees: {
    title: { en: "Fees & Appointments", fr: "Tarifs & Rendez-vous" },
    therapy: {
      title: {
        en: "Individual therapy session",
        fr: "Séance individuelle de thérapie",
      },
      price: { en: "50min - £90", fr: "50min - 100€" },
    },
    supervision: {
      title: { en: "Clinical Supervision", fr: "Séance de supervision" },
      price: { en: "50min - £90*", fr: "50min - 100€*" },
      note: {
        en: "*£60 for trainees and members of the AFTCC",
        fr: "*70€ pour les étudiants et membres de l'AFTCC",
      },
    },
  },

  // About Me
  about: {
    title: { en: "About Me", fr: "À propos de moi" },
    education: {
      title: { en: "Education and Training", fr: "Formation" },
      text: {
        en: `
          I am a **French Clinical Psychologist** with a Bachelor's and a Master's of Science degree in Clinical Psychology and Psychopathology from the University of Paris Cité.

          I completed three years of specialised training in **Cognitive and Behavioural Therapy (CBT)** at the French Association for Cognitive-Behavioural Therapy (AFTCC), where I also undertook a two-year advanced training program to become a **CBT supervisor**.

          In addition, I have pursued extensive training in **Acceptance and Commitment Therapy (ACT)** and have acquired clinical skills in **Dialectical Behaviour Therapy (DBT)**.
        `,
        fr: `
          Je suis diplômée d'une licence et d'un **master de Psychologie Clinique et Psychopathologie** de l'Université Paris Cité.

          Dans le but de compléter ma formation initiale, j'ai obtenu une qualification spécialisée en **Thérapie Comportementale et Cognitive (TCC)** après trois années de formation à l'AFTCC.

          De plus, j'ai également été formée à la **Thérapie d'Acceptation et d'Engagement (ACT)** et j'ai acquis des compétences en **Thérapie Comportementale Dialectique (DBT)**.
        `,
      },
    },
    experience: {
      title: { en: "Experience", fr: "Expérience" },
      text: {
        en: `
          I have over 12 years of experience in **public and private health sectors** across **France, Singapore, and the UK**, supporting clients of all ages with a wide range of difficulties. My background includes conducting assessments for severe psychiatric disorders in hospital psychiatric departments and designing interventions for children and adolescents with developmental challenges.

          In **private practice**, I work with clients struggling with anxiety, depression, grief, relational difficulties, low self-esteem, and identity questions. I practice in French and English, supporting people from diverse cultural backgrounds.

          Since moving to **Brighton** in 2023, I see clients in person at **Brighton and Hove Psychotherapy** and continue to offer online consultations across Europe and Asia via **The Other Clinic**.
        `,
        fr: `
          Avec plus de 12 ans d'expérience dans les **secteurs public et privé en France et à l'international**, j'ai accompagné des patients aux profils variés, notamment dans des services hospitaliers de psychiatrie auprès de personnes souffrant de troubles psychiatriques sévères.

          En **cabinet libéral**, j'accompagne des patients de tous âges confrontés à l'anxiété, la dépression, le deuil, les difficultés relationnelles ou les questionnements identitaires. Mon expérience en France, à Singapour et au Royaume-Uni m'a permis de développer une approche adaptée aux contextes multiculturels.

          Installée à **Brighton** depuis 2023, je reçois au cabinet **Brighton and Hove Psychotherapy** et propose également des consultations en ligne pour les patients résidant en Europe et en Asie.
        `,
      },
    },
    affiliations: {
      title: {
        en: "Professional Affiliation",
        fr: "Affiliation professionnelle",
      },
      list: [
        {
          logo: "logo_bps.png",
          role: {
            en: "Chartered Member CPsychol (716681)",
            fr: "Chartered Member CPsychol (716681)",
          },
          org: {
            en: "British Psychological Society (BPS)",
            fr: "British Psychological Society (BPS)",
          },
          location: { en: "United Kingdom", fr: "Royaume-Uni" },
          since: { en: "Since 2023", fr: "Depuis 2023" },
        },
        {
          logo: "logo_sps.png",
          role: {
            en: "Full Member (FM022016A)",
            fr: "Full Member (FM022016A)",
          },
          org: {
            en: "Singapore Psychological Society (SPS)",
            fr: "Société de Psychologie de Singapour (SPS)",
          },
          location: { en: "Singapore", fr: "Singapour" },
          since: { en: "Since 2021", fr: "Depuis 2021" },
        },
        {
          logo: "logo_aftcc.png",
          role: {
            en: "CBT - Registered Therapist Practitioner & Supervisor",
            fr: "Thérapeute Praticien TCC & Superviseur TPS",
          },
          org: {
            en: "French Association for Behavioural and Cognitive Therapy (AFTCC)",
            fr: "Association Française de Thérapie Comportementale et Cognitive (AFTCC)",
          },
          location: { en: "France", fr: "France" },
          since: { en: "Since 2014", fr: "Depuis 2014" },
        },
        {
          logo: "logo_acbs.jpg",
          role: {
            en: "Professional Member ‑ ACT Practitioner",
            fr: "Membre Professionnel ‑ Praticien ACT",
          },
          org: {
            en: "Association for Contextual Behavioural Science (ACBS)",
            fr: "Association pour les Sciences Comportementales et Contextuelles (ACBS)",
          },
          location: {
            en: "Intl, UK Chapter",
            fr: "International, section du Royaume-Uni",
          },
          since: { en: "Since 2023", fr: "Depuis 2023" },
        },
        {
          logo: "logo_universite.png",
          role: { en: "Alumni Member", fr: "Membre Alumni" },
          org: { en: "Université Paris Cité", fr: "Université Paris Cité" },
          location: { en: "France", fr: "France" },
          since: { en: "Since 2014", fr: "Depuis 2014" },
        },
      ],
      footer: {
        en: "I have been engaged in monthly supervision continuously since graduation, with professionals trained in CBT and/or ACT.",
        fr: "Je suis en supervision clinique mensuelle depuis 2015 avec des professionnels formés aux TCC et à l'ACT.",
      },
    },
    // Pins on the map image: `top` and `left` are percentages of the image size.
    // `label: "top"` puts the name above the pin instead of below.
    map: [
      {
        place: { en: "New York", fr: "New York" },
        years: { en: "2007-2009", fr: "2007-2009" },
        text: { en: "Lived in New York", fr: "Vie à New York" },
        top: 32,
        left: 19,
        label: "top",
      },
      {
        place: { en: "Paris", fr: "Paris" },
        years: { en: "2009-2018", fr: "2009-2018" },
        text: {
          en: "Studied at the University of Paris Cité, worked for 4 years at the 'Hôpital du Chesnay'",
          fr: "Études à l'Université Paris Cité, psychologue à l'Hôpital du Chesnay",
        },
        top: 24,
        left: 44,
      },
      {
        place: { en: "Singapore", fr: "Singapour" },
        years: { en: "2018-2023", fr: "2018-2023" },
        text: {
          en: "Worked at Thrive Family, The Other Clinic in Singapore",
          fr: "Thrive Family, The Other Clinic à Singapour",
        },
        top: 60,
        left: 75,
      },
      {
        place: { en: "Brighton", fr: "Brighton" },
        years: { en: "2023-present", fr: "2023-présent" },
        text: {
          en: "Brighton & Hove Psychotherapy in Brighton, UK",
          fr: "Brighton & Hove Psychothérapie à Brighton, UK",
        },
        top: 18,
        left: 43,
        label: "top",
      },
    ],
  },

  // =========================================================== BUTTONS AND MENUS
  labels: {
    nav_bio: { en: "Biography", fr: "Biographie" },
    nav_practice: { en: "Where to find me", fr: "Où me trouver" },
    nav_services: { en: "Services", fr: "Services" },
    nav_blog: { en: "Blog", fr: "Blog" },
    nav_about: { en: "About Me", fr: "À propos" },
    btn_background: { en: "About me", fr: "Mon parcours" },
    btn_contact: { en: "Contact", fr: "Me Contacter" },
    btn_book: { en: "Book an Appointment", fr: "Prendre Rendez-vous" },
    btn_supervision: {
      en: "Supervision Inquiry",
      fr: "Demande de supervision",
    },
    read_more: { en: "Read Article", fr: "Lire l'article" },
    all_articles: { en: "All articles", fr: "Tous les articles" },
    skip_to_content: { en: "Skip to content", fr: "Aller au contenu" },
    published: { en: "Published", fr: "Publié le" },
    contact: { en: "Contact", fr: "Contact" },
    web: { en: "Web", fr: "Web" },
  },

  // Therapy inquiry form
  form: {
    title: { en: "Therapy Inquiry", fr: "Demande de Thérapie" },
    lbl_email: { en: "Your Email", fr: "Votre Email" },
    lbl_availability: { en: "Preferred Days/Time", fr: "Jours/Heure Préférés" },
    lbl_type: { en: "Consultation Type", fr: "Type de Consultation" },
    opt_online: { en: "Online", fr: "En ligne" },
    opt_inperson: { en: "In-Person", fr: "En Personne" },
    lbl_message: { en: "Message", fr: "Message" },
    btn_submit: { en: "Send Request", fr: "Envoyer" },
    btn_close: { en: "Close", fr: "Fermer" },
  },

  // Supervision inquiry form
  form_supervision: {
    title: { en: "Supervision Inquiry", fr: "Demande de Supervision" },
    lbl_email: { en: "Your Email", fr: "Votre Email" },
    lbl_background: { en: "Your Background", fr: "Votre Profil" },
    opt_trainee: { en: "In training at AFTCC", fr: "En formation à l'AFTCC" },
    opt_qualified: { en: "Qualified Therapist", fr: "Thérapeute qualifié(e)" },
    lbl_availability: { en: "Preferred Days/Time", fr: "Jours/Heure Préférés" },
    lbl_message: { en: "Message", fr: "Message" },
    btn_submit: { en: "Send Request", fr: "Envoyer" },
    btn_close: { en: "Close", fr: "Fermer" },
  },

  // =========================================================== ARTICLES

  // In the order they appear on the site. To add an article, copy a whole
  // block from { to }, paste it where it should appear, and change it.
  // - id: a unique name for the article. Don't change it once published.
  // - slug: the web address (lucietherapy.com/blog/<slug>/). Lowercase,
  //   no accents, hyphens instead of spaces. Don't change it once published.
  // - image: a file in the media/ folder
  // - date: "YYYY-MM-DD", or "" for no date
  // - To publish in one language only, leave out the other language in
  //   `text` (e.g. only en: `...`).
  blog: [
    {
      id: "post-what-is-cbt",
      image: "blog_cbt.jpg",
      date: "",
      slug: {
        en: "what-is-cbt-cognitive-behavioural-therapy",
        fr: "qu-est-ce-que-la-tcc",
      },
      title: {
        en: "What is Cognitive Behavioural Therapy (CBT)?",
        fr: "Qu'est-ce que la Thérapie Cognitivo-Comportementale (TCC) ?",
      },
      seo: {
        title: {
          en: "What is CBT? Cognitive Behavioural Therapy Explained",
          fr: "Qu'est-ce que la TCC ? La thérapie cognitivo-comportementale expliquée",
        },
        description: {
          en: "How Cognitive Behavioural Therapy works: a structured, evidence-based talking therapy for anxiety, depression, OCD and more. Explained by a chartered psychologist.",
          fr: "Comment fonctionne la Thérapie Cognitivo-Comportementale : une thérapie structurée et validée scientifiquement pour l'anxiété, la dépression, les TOC.",
        },
        keywords: {
          en: [
            "CBT",
            "cognitive behavioural therapy",
            "evidence-based therapy",
            "AFTCC",
          ],
          fr: [
            "TCC",
            "thérapie cognitivo-comportementale",
            "AFTCC",
            "psychologue",
          ],
        },
      },
      text: {
        en: `
          **Cognitive Behavioural Therapy (CBT)** is the main foundation of my clinical work. I use **evidence-based approaches**, including **CBT** and **Acceptance and Commitment Therapy (ACT)**. I was trained in CBT with the **French Association for Cognitive and Behavioural Therapy (AFTCC)**.

          CBT is a **structured**, **collaborative**, and **goal-oriented** talking therapy. It focuses on identifying **unhelpful patterns of thinking**, **emotional responses**, and **behaviours**, and replacing them with more **helpful and adaptive** ones. The emphasis is on **present difficulties** and **practical change** in everyday life.

          Therapy is based on a **partnership** between client and therapist. Together, we define **clear goals** and regularly **review progress**, adjusting the **treatment plan** when needed. Clients are **active participants** in their care and may be invited to practice **exercises between sessions** to support learning and change.

          CBT is an **empowering approach** that helps clients better understand their own **functioning** and develop **practical strategies** they can continue to use **beyond therapy**.

          CBT is one of the **most extensively researched** psychological treatments and is considered an **evidence-based therapy**. It has been shown to be effective for a wide range of difficulties, including **anxiety**, **depression**, **eating disorders**, **insomnia**, **obsessive-compulsive disorder**, **panic disorder**, **post-traumatic stress disorder**, **substance use difficulties**, and for managing **stressful life situations**.

          My therapeutic work is grounded in **respect** and **compassion**, providing a **supportive space** for clients to express their experiences while working toward **meaningful and sustainable change**.
        `,
        fr: `
          La **Thérapie Cognitivo-Comportementale (TCC)** constitue la base principale de mon travail clinique. J'utilise des **approches fondées sur des données scientifiques**, notamment la **TCC** et la **Thérapie d'Acceptation et d'Engagement (ACT)**. J'ai été formée à la TCC par l'**Association Française de Thérapie Comportementale et Cognitive (AFTCC)**.

          La TCC est une thérapie **structurée**, **collaborative** et **orientée vers des objectifs**. Elle vise à identifier les **schémas de pensées**, les **réactions émotionnelles** et les **comportements inadaptés**, puis à les remplacer par des alternatives **plus utiles et adaptées**. L'accent est mis sur les **difficultés actuelles** et sur des **changements concrets** dans la vie quotidienne.

          La thérapie repose sur un **partenariat** entre le patient et le thérapeute. Les **objectifs** sont définis conjointement et les **progrès** sont régulièrement évalués afin d'ajuster le **plan de traitement** si nécessaire. Le patient est un **acteur actif** de sa prise en charge et peut être invité à réaliser des **exercices entre les séances**.

          La TCC est une approche **“empouvoirante”** (“empowering”) qui aide les personnes à mieux comprendre leur **fonctionnement** et à développer des **stratégies pratiques** qu'elles pourront continuer à utiliser **après la thérapie**.

          La TCC est l'une des approches psychothérapeutiques **les plus étudiées** et est reconnue comme une **thérapie fondée sur des preuves scientifiques**. Elle a démontré son efficacité dans le traitement de nombreuses difficultés, telles que **l'anxiété**, **la dépression**, **les troubles du comportement alimentaire**, **l'insomnie**, **le trouble obsessionnel-compulsif**, **le trouble panique**, **l'état de stress post-traumatique**, **les troubles liés à l'usage de substances**, ainsi que dans la gestion des **situations de vie stressantes**.

          Mon travail thérapeutique s'inscrit dans un cadre de **respect** et de **compassion**, offrant un **espace sécurisant** pour l'expression de l'expérience vécue et favorisant un **changement durable et porteur de sens**.
        `,
      },
    },

    {
      id: "post-why-consult-therapist",
      image: "blog_whyconsult.jpg",
      date: "",
      slug: {
        en: "why-consult-a-therapist",
        fr: "pourquoi-consulter-un-psychologue",
      },
      title: {
        en: "Why Consult a Therapist?",
        fr: "Pourquoi consulter un psychologue ?",
      },
      seo: {
        title: {
          en: "Why Consult a Therapist? Reasons to Start Therapy",
          fr: "Pourquoi consulter un psychologue ? Motifs de consultation",
        },
        description: {
          en: "You do not need to be in crisis to start therapy. Common reasons people seek help, and what a first step toward support actually looks like.",
          fr: "Il n'est pas nécessaire d'attendre la crise pour consulter. Les motifs fréquents de consultation et ce qu'une première démarche implique réellement.",
        },
        keywords: {
          en: ["why see a therapist", "starting therapy", "when to seek help"],
          fr: [
            "pourquoi consulter un psychologue",
            "motifs de consultation",
            "première séance",
          ],
        },
      },
      text: {
        en: `
          At times, life can feel overwhelming, painful, or difficult to navigate alone. Therapy offers a space to slow down, reflect, and better understand what you are going through in a supportive and non-judgmental environment.

          People seek therapy for many different reasons. Some come during periods of crisis or emotional distress, while others wish to better understand themselves, improve their relationships, navigate important life transitions, or develop healthier ways of coping with stress and emotions.

          Therapy is not only for moments of crisis. You do not need to “have it all figured out” or wait until things become unbearable before reaching out for support. Sometimes, simply feeling stuck, emotionally exhausted, disconnected, or overwhelmed can be enough reason to seek help.

          As a psychologist, I aim to provide a space where you can feel heard, supported, and understood. Together, we can explore patterns of thinking, emotional reactions, behaviours, and life experiences that may be contributing to your current difficulties. Therapy can help create more flexibility, self-understanding, and space to respond to challenges in a way that is more aligned with your needs and values.

          Seeking support can be an important first step toward meaningful and lasting change.

          ### Reasons People May Seek Therapy

          The reasons for seeking therapy are varied and personal. There is no “wrong” reason to ask for support.

          Here are some common reasons people may reach out:

          - Anxiety and stress
          - Sadness or depression
          - Burnout and emotional exhaustion
          - Anger or difficulty regulating emotions
          - Relationship or interpersonal difficulties
          - Low self-esteem or self-criticism
          - Sleep difficulties
          - Feeding and eating disorders
          - Difficult life events or transitions
          - Grief and loss
          - Identity questioning or self-discovery
          - Perfectionism and pressure to perform
          - Feeling stuck or overwhelmed
          - Impulsive behaviours or difficulty coping
          - Pain, suffering, or emotional distress
          - Desire for change or personal growth
        `,
        fr: `
          Par moments, la vie peut sembler difficile, éprouvante ou compliquée à traverser seul. La thérapie offre un espace pour ralentir, prendre du recul et mieux comprendre ce que l'on traverse, dans un cadre soutenant et sans jugement.

          Les raisons de consulter sont nombreuses et propres à chacun. Certaines personnes viennent en période de crise ou de souffrance importante, tandis que d'autres souhaitent mieux se comprendre, améliorer leurs relations, traverser une transition de vie ou développer des manières plus adaptées de faire face au stress et aux émotions.

          La thérapie ne s'adresse pas uniquement aux situations de crise. Il n'est pas nécessaire d'attendre que les difficultés deviennent insupportables pour demander de l'aide. Se sentir bloqué, dépassé, émotionnellement épuisé ou en décalage avec soi-même peut déjà être une raison suffisante pour consulter.

          En tant que psychologue, je cherche à offrir un espace où vous puissiez vous sentir écouté, soutenu et compris. Ensemble, nous pouvons explorer certains schémas de pensée, réactions émotionnelles, comportements ou expériences de vie qui contribuent aux difficultés actuelles. La thérapie peut aider à développer davantage de flexibilité, de compréhension de soi et de liberté dans la manière de répondre aux défis rencontrés.

          Demander du soutien peut constituer une première étape importante vers un changement durable et une manière de se sentir davantage en accord avec soi-même.

          ### Motifs fréquents de consultation

          Les motifs de consultation sont nombreux et variés. Il n'y a pas de « mauvaise » raison de demander du soutien.

          Voici quelques exemples fréquents :

          - Anxiété et stress
          - Tristesse ou dépression
          - Burnout et épuisement émotionnel
          - Colère ou difficultés à réguler ses émotions
          - Difficultés relationnelles ou interpersonnelles
          - Estime de soi ou autocritique
          - Troubles du sommeil
          - Troubles du comportement alimentaire
          - Événements de vie difficiles ou transitions
          - Deuil et perte
          - Questionnements identitaires ou découverte de soi
          - Perfectionnisme et pression de performance
          - Sentiment d'être bloqué ou dépassé
          - Comportements impulsifs ou difficultés d'adaptation
          - Souffrance psychologique ou émotionnelle
          - Désir de changement ou de développement personnel
        `,
      },
    },

    {
      id: "post-what-is-ACT",
      image: "blog_act.webp",
      date: "",
      slug: {
        en: "acceptance-and-commitment-therapy-act",
        fr: "therapie-acceptation-engagement-act",
      },
      title: {
        en: "Acceptance and Commitment Therapy (ACT): Building a Meaningful Life",
        fr: "Thérapie d'Acceptation et d'Engagement (ACT) : Vers une vie porteuse de sens",
      },
      seo: {
        title: {
          en: "Acceptance and Commitment Therapy (ACT): Building a Meaningful Life",
          fr: "Thérapie d'Acceptation et d'Engagement (ACT) : vers une vie porteuse de sens",
        },
        description: {
          en: "ACT explained by a practitioner trained by Steven Hayes and Russ Harris: psychological flexibility, values-based action, and what to expect in sessions.",
          fr: "L'ACT expliquée par une praticienne formée par Steven Hayes et Russ Harris : flexibilité psychologique, valeurs, et déroulement des séances.",
        },
        keywords: {
          en: [
            "ACT",
            "acceptance and commitment therapy",
            "psychological flexibility",
            "ACBS",
          ],
          fr: [
            "ACT",
            "thérapie acceptation engagement",
            "flexibilité psychologique",
            "ACBS",
          ],
        },
      },
      text: {
        en: `
          **Acceptance and Commitment Therapy (ACT)** is one of the core approaches guiding my clinical work, alongside **Cognitive Behavioural Therapy (CBT)**. Both are **evidence-based therapies** grounded in scientific research.

          I have completed multiple **foundational and advanced trainings in ACT**, focusing on its application with **adults, adolescents, children, and parenting contexts**. My training has been delivered by internationally recognised ACT clinicians, including **Dr. Steven C. Hayes**, the originator and co-developer of ACT, and **Russ Harris**, a leading ACT trainer and author.

          I continue to develop my clinical expertise through regular advanced courses exploring the use of ACT in specific situations such as **grief**, **relationship difficulties**, and **sleep disorders**. I am also a member of the **Association for Contextual Behavioural Science (ACBS)**.

          ACT is part of the **third wave of cognitive-behavioural therapies**. Rather than focusing solely on symptom reduction, ACT helps people develop **psychological flexibility** - the ability to stay present, open up to internal experiences, and take action guided by personal values, even when life feels challenging.

          In ACT, **values** refer to **what is most important to you** and the way you want to live your life. They are not goals to be achieved, but ongoing directions that give meaning to your actions. Therapy focuses on clarifying these values so they can guide choices, rather than fear, avoidance, or self-doubt.

          ACT is a **collaborative and experiential** therapy. Sessions include practical exercises that help you notice thoughts and emotions without being overwhelmed by them, make room for difficult experiences, strengthen present-moment awareness, and take **meaningful action aligned with what truly matters to you**.

          ACT has been shown to be effective for a wide range of difficulties, including **anxiety**, **depression**, **mood disorders**, **relationship challenges**, **sleep disorders**, **chronic pain**, and **addictive behaviours**. While ACT is often considered a brief therapy, the skills developed tend to have **long-lasting benefits**.

          ACT offers a space to explore inner experiences with openness while learning how to move forward in a way that feels **authentic**, **meaningful**, and aligned with **what matters most to you**.
        `,
        fr: `
          La **Thérapie d'Acceptation et d'Engagement (ACT)** fait partie des approches centrales qui orientent mon travail clinique, aux côtés de la **Thérapie Cognitivo-Comportementale (TCC)**. Ces deux approches sont **fondées sur des données scientifiques** et largement reconnues pour leur efficacité.

          J'ai suivi plusieurs **formations fondamentales et avancées en ACT**, portant sur son utilisation auprès des **adultes, des adolescents et des enfants**, ainsi que dans des contextes de **parentalité**. Ces formations ont été dispensées par des cliniciens de référence au niveau international, notamment le **Dr Steven C. Hayes**, fondateur et co-développeur de l'ACT, ainsi que **Russ Harris**, formateur et auteur reconnu dans ce champ.

          Je poursuis régulièrement le développement de mes compétences à travers des **formations avancées**, centrées sur l'application de l'ACT à des situations cliniques spécifiques telles que le **deuil**, les **difficultés relationnelles**, les **troubles du sommeil**, ou encore d'autres problématiques complexes du quotidien. Je suis également membre de l'**Association for Contextual Behavioural Science (ACBS)**.

          L'ACT s'inscrit dans la **troisième vague des thérapies cognitivo-comportementales**. Plutôt que de viser uniquement la disparition des symptômes, elle cherche à développer la **flexibilité psychologique** : la capacité à rester en contact avec l'instant présent, à s'ouvrir à son expérience intérieure et à agir en cohérence avec ce qui compte réellement pour soi, même lorsque cela implique de l'inconfort.

          En ACT, les **valeurs** renvoient à **ce qui est profondément important pour la personne**, à la manière dont elle souhaite orienter sa vie et incarner certaines qualités (par exemple être présent, engagé, bienveillant, authentique). Il ne s'agit pas d'objectifs à atteindre, mais de **directions de vie** qui donnent du sens aux actions. Le travail thérapeutique consiste notamment à clarifier ces valeurs afin qu'elles puissent guider les choix, plutôt que l'évitement, la peur ou le doute.

          L'ACT est une approche **collaborative et expérientielle**. Les séances s'appuient sur des exercices concrets permettant d'apprendre à observer ses pensées et émotions sans s'y laisser envahir, à faire de la place aux expériences difficiles, à renforcer l'ancrage dans le moment présent et à s'engager dans des **actions cohérentes avec ce qui compte vraiment**.

          De nombreuses études ont montré l'efficacité de l'ACT pour diverses difficultés, notamment **l'anxiété**, **la dépression**, les **troubles de l'humeur**, les **difficultés relationnelles**, les **troubles du sommeil**, la **douleur chronique** et les **comportements addictifs**. Bien que l'ACT soit souvent considérée comme une thérapie relativement brève, les compétences développées au cours du travail thérapeutique ont des **effets durables**.

          L'ACT offre ainsi un cadre permettant d'aborder son expérience intérieure avec davantage d'ouverture, tout en avançant progressivement vers une vie **plus authentique, plus engagée et plus en accord avec ce qui est essentiel pour soi**.
        `,
      },
    },

    {
      id: "post-navigating-expat-life",
      image: "blog_expat.png",
      date: "",
      slug: {
        en: "therapy-for-expats-living-abroad",
        fr: "accompagnement-psychologique-expatries",
      },
      title: {
        en: "Navigating Life Abroad: Support for Expatriates",
        fr: "Vivre à l'Étranger : Accompagnement des Expatriés",
      },
      seo: {
        title: {
          en: "Therapy for Expats: Support for Life Abroad",
          fr: "Vivre à l'étranger : accompagnement psychologique des expatriés",
        },
        description: {
          en: "The hidden difficulties of expatriate life - isolation, cultural adjustment, family strain - and how therapy with a multilingual psychologist can help.",
          fr: "Les difficultés moins visibles de l'expatriation - isolement, adaptation culturelle, tensions familiales - et comment un suivi psychologique peut aider.",
        },
        keywords: {
          en: [
            "expat therapy",
            "therapy for expatriates",
            "moving abroad",
            "cultural adjustment",
          ],
          fr: [
            "psychologue expatriés",
            "expatriation",
            "thérapie en français à l'étranger",
          ],
        },
      },
      text: {
        en: `
          Expatriation presents a remarkable opportunity for growth - both professionally and personally. Often romanticized as an idyllic adventure filled with travel, cultural immersion, enriching encounters, and skill development, the reality of life abroad can also be demanding. Leaving behind what is familiar and reconstructing a sense of home and identity in a new environment can test one's resilience and emotional resources.

          This leap into the unknown sometimes requires significant psychological and emotional adjustment - learning how to navigate change while making space for fulfilment, connection, and a sense of belonging.

          ### Common Challenges for Expatriates

          - **Adapting to a new environment** that feels very different from home
          - **Language barriers** and the frustration of not being fully understood
          - **Cultural differences** and the need to integrate new social norms
          - **Separation from family and loved ones**, particularly when supporting aging parents from afar
          - **Instability of social connections** due to frequent moves and turnover in expatriate communities
          - **Supporting children's adjustment**, including schooling, peer relationships, and identity shifts
          - **Strain on couple or family relationships** due to changing roles and stress

          These experiences are common among expatriates but not always visible from the outside. What may appear exciting or promising can also bring **loss, disorientation, loneliness, and pressure** - real emotions that deserve attention and support.

          ### How Therapy Can Help

          Therapy offers a **supportive, collaborative approach**, to help you understand and manage the emotional and practical challenges of expatriation, **develop coping strategies**, and **strengthen adaptation and resilience skills**.

          - **Psychological adaptation to cultural change** - Understanding how differences in norms, language, and social context influence your identity and sense of belonging
          - **Managing stress, uncertainty, and loss** - Recognizing the emotional impact of leaving familiar support networks behind and exploring effective coping strategies
          - **Strengthening adaptation and resilience skills** - Developing strategies to handle daily challenges abroad
          - **Supporting family and couple relationships** - Addressing how cultural transitions affect communication, roles, and connections with loved ones
          - **Clarifying identity and values** - Reflecting on shifts in your values, sense of purpose, and personal identity
          - **Supporting children and adolescents** - Helping young family members navigate school changes, identity development, and social adaptation

          In our sessions, you will find a **safe, supportive, and non-judgmental environment** where you can explore your experience, deepen your understanding of what you are going through, and develop practical strategies to navigate life abroad.
        `,
        fr: `
          L'expatriation est une occasion exceptionnelle de développement, tant sur le plan professionnel que personnel. Souvent idéalisée comme une aventure enrichissante faite de voyages, d'immersion culturelle et de rencontres stimulantes, la réalité de la vie à l'étranger peut également être exigeante. Quitter ce qui est familier et reconstruire un sentiment de foyer et d'identité dans un nouvel environnement peut mettre à l'épreuve votre résilience et vos ressources émotionnelles.

          Ce saut dans l'inconnu demande parfois un **ajustement psychologique et émotionnel important - apprendre à gérer le changement tout en faisant de la place pour l'épanouissement, la connexion sociale et le sentiment d'appartenance.**

          ### Défis courants rencontrés par les expatriés

          - **S'adapter à un nouvel environnement** très différent de celui auquel on est habitué
          - **Barrières linguistiques** et frustration de ne pas être pleinement compris
          - **Différences culturelles** et nouvelles normes sociales à comprendre et à intégrer
          - **Séparation de la famille et des proches**, notamment lorsque l'on soutient des **parents vieillissants à distance**
          - **Instabilité des liens sociaux** due aux changements fréquents au sein des communautés d'expatriés
          - **Accompagnement de l'adaptation des enfants**, y compris l'école, les relations avec les pairs et les changements identitaires
          - **Tensions dans les relations de couple ou familiales** liées aux changements de rôles et au stress

          Ces expériences sont courantes chez les expatriés, mais elles ne sont pas toujours visibles. Ce qui peut sembler excitant ou prometteur peut également générer **perte, désorientation, solitude et pression**, des émotions réelles qui méritent attention et accompagnement.

          ### Comment la thérapie peut vous aider

          La thérapie propose un **accompagnement collaboratif et bienveillant**, pour vous aider à comprendre et gérer les défis émotionnels et pratiques liés à l'expatriation, **développer des stratégies d'adaptation** et **renforcer vos capacités de résilience**.

          - **L'adaptation psychologique au changement culturel** - Comprendre comment les différences de normes, de langue et de contexte social influencent votre identité et votre sentiment d'appartenance
          - **La gestion du stress, de l'incertitude et des pertes** - Reconnaître l'impact émotionnel de la séparation avec vos repères habituels et explorer des stratégies d'adaptation efficaces
          - **Le renforcement des compétences d'adaptation et de résilience** - Développer des stratégies pour gérer le stress et les défis de la vie quotidienne à l'étranger
          - **Le soutien des relations familiales et conjugales** - Aborder les effets des transitions culturelles sur la communication, les rôles et les liens avec vos proches
          - **La clarification de l'identité et des valeurs** - Réfléchir aux **évolutions de vos valeurs, du sens que vous donnez à votre vie et de votre identité personnelle**
          - **L'accompagnement des enfants et adolescents** - Soutenir les jeunes membres de la famille dans les changements scolaires, le développement identitaire et l'adaptation sociale

          Dans nos séances, vous trouverez un **environnement sécurisant, bienveillant et sans jugement**, où vous pourrez explorer votre expérience, approfondir votre compréhension de ce que vous traversez et développer des stratégies pratiques pour naviguer la vie à l'étranger.
        `,
      },
    },

    {
      id: "post-cbt-supervision",
      image: "blog_supervision.jpg",
      date: "",
      slug: {
        en: "cbt-supervision-for-therapists",
        fr: "supervision-tcc-pour-therapeutes",
      },
      title: {
        en: "CBT Supervision: A Dedicated Space for Your Professional Growth",
        fr: "Supervision TCC : Un espace dédié à votre développement professionnel",
      },
      seo: {
        title: {
          en: "CBT Supervision for Therapists and Trainees",
          fr: "Supervision TCC pour thérapeutes et étudiants",
        },
        description: {
          en: "CBT supervision with an AFTCC-certified supervisor (TPS): case formulation, technical skills, ethical dilemmas, and support toward AFTCC certification.",
          fr: "Supervision TCC avec une superviseure certifiée TPS reconnue par l'AFTCC : formulation de cas, compétences techniques, dilemmes éthiques, certification.",
        },
        keywords: {
          en: [
            "CBT supervision",
            "clinical supervision",
            "AFTCC supervisor",
            "TPS",
          ],
          fr: [
            "supervision TCC",
            "superviseur AFTCC",
            "TPS",
            "supervision clinique",
          ],
        },
      },
      text: {
        en: `
          As a **TPS-certified supervisor** (Thérapeute Praticien Superviseur) recognised by the **AFTCC**, I offer **CBT supervision** for clinicians and students. Supervision supports your **professional development**, strengthens your clinical skills, and can contribute to your AFTCC certification pathway.

          For me, supervision is more than a technical requirement. It is a conscious choice to **create a protected space** - time set aside for reflecting on your practice, exploring your questions, and developing both your clinical confidence and your technical skills as a therapist.

          Throughout my own professional journey, supervision has been essential. I continue to engage in it because it is where I slow down, think carefully about my work, and receive guidance on complex cases. Supervision has helped me refine my clinical reasoning, strengthen my CBT techniques, navigate ethical and relational challenges, and stay grounded when the work feels heavy or overwhelming. The mentors who guided me have profoundly shaped both how I work with clients and how I now support other therapists in their development.

          My aim is to offer you a **thoughtful, supportive, and intentional space** - a place to explore your cases, hone your skills, ask questions, and notice your growth as a clinician over time.

          ### Why Supervision Matters

          Supervision is a form of professional self-care and skill-building. It's a space to pause, reflect, strengthen your techniques, and seek support when facing challenging cases, uncertainty, or emotional load.

          Many therapists I work with are not only focused on their current caseload - they also recognise that their practice is evolving and that dedicated space is essential to grow both technically and professionally.

          CBT supervision provides a thoughtful, collaborative environment to:

          - Reflect on clinical practice and case formulation
          - Strengthen technical and conceptual CBT skills
          - Develop clinical confidence and professional identity
          - Work through ethical dilemmas and complex situations
          - Integrate evidence-based strategies effectively
          - Prevent burnout with clinical support
          - Support AFTCC certification and ongoing professional development

          Feedback is offered with care, respect, and attention to your experience, learning needs, and stage of development.

          ### Commitment and Collaboration

          Supervision is a collaborative process. Your engagement - through case preparation, reflection, and deliberate practice - makes the work meaningful. Together, we build a professional partnership that supports **ethical, effective, and technically sound CBT practice**, while recognising you as a developing professional, not just a set of techniques.
        `,
        fr: `
          En tant que **superviseure certifiée TPS** (Thérapeute Praticien Superviseur) reconnue par l'**AFTCC (Association Française de Thérapie Comportementale et Cognitive)**, je propose des services de **supervision en TCC** pour praticiens et étudiants. La supervision soutient votre **développement professionnel**, renforce vos compétences cliniques et peut s'inscrire dans le cadre de la certification AFTCC.

          Pour moi, la supervision va bien au-delà d'une simple exigence technique. C'est un choix conscient de **créer un espace protégé** - du temps réservé pour réfléchir à votre pratique, explorer vos questionnements et développer à la fois votre confiance clinique et vos compétences techniques.

          Tout au long de mon parcours professionnel, la supervision a été essentielle. J'y participe encore aujourd'hui, car c'est là que je peux ralentir, réfléchir en profondeur à ma pratique et recevoir un accompagnement sur des situations complexes. Elle m'a aidée à affiner mon raisonnement clinique, renforcer mes techniques en TCC, naviguer des situations éthiques et relationnelles complexes, et **rester centrée face aux défis professionnels**. Les superviseurs qui m'ont accompagnée ont profondément façonné ma manière de travailler avec les patients et d'accompagner d'autres thérapeutes dans leur développement.

          Mon objectif est de vous offrir un **espace réfléchi, bienveillant et soutenant**, où vous pouvez explorer vos cas, affiner vos compétences, poser vos questions et **progresser en tant que clinicien**.

          ### Objectifs et avantages de la supervision

          La supervision TCC offre un **cadre réfléchi, bienveillant et soutenant** pour :

          - Réfléchir à la pratique clinique et aux cas apportés
          - Renforcer vos compétences techniques et conceptuelles en TCC
          - Développer votre confiance et votre identité professionnelle
          - Aborder des dilemmes éthiques et des situations complexes
          - Intégrer efficacement des stratégies fondées sur des preuves
          - Prévenir l'épuisement professionnel en bénéficiant d'un soutien clinique
          - Soutenir la certification AFTCC et votre développement professionnel continu

          La supervision favorise votre progression en tant que clinicien en offrant des **feedbacks** constructifs et adaptés à vos besoins.

          ### Engagement et collaboration

          La supervision fonctionne comme un **partenariat actif**. Votre implication - que ce soit dans la préparation des cas, la réflexion ou la mise en pratique - permet à la supervision d'être réellement bénéfique pour votre développement professionnel. Ensemble, nous construisons un cadre de travail qui soutient une pratique de la TCC **éthique, efficace et techniquement solide**, tout en accompagnant votre progression en tant que clinicien·ne.
        `,
      },
    },

    {
      id: "post-online-therapy",
      image: "blog_online_therapy.webp",
      date: "",
      slug: {
        en: "benefits-of-online-therapy",
        fr: "bienfaits-de-la-therapie-en-ligne",
      },
      title: {
        en: "Online Therapy: Accessible Support from Anywhere",
        fr: "Thérapie en Ligne : un soutien accessible où que vous soyez",
      },
      seo: {
        title: {
          en: "The Benefits and Limits of Online Therapy",
          fr: "Les avantages et limites de la thérapie en ligne",
        },
        description: {
          en: "What online therapy offers - accessibility, continuity of care, choice of practitioner - and the practical points to consider before starting.",
          fr: "Ce qu'apporte la thérapie en ligne - accessibilité, continuité des soins, choix du praticien - et les points pratiques à considérer avant de commencer.",
        },
        keywords: {
          en: [
            "online therapy",
            "teletherapy",
            "remote counselling",
            "video sessions",
          ],
          fr: [
            "thérapie en ligne",
            "téléconsultation psychologue",
            "psychologue à distance",
          ],
        },
      },
      text: {
        en: `
          Whether you are going through a life transition, facing challenges abroad, or simply looking for accessible support, I offer **online therapy sessions** tailored to your needs.

          I am committed to providing the same high standards of **ethics, confidentiality, and quality of care** as in in-person sessions.

          To help you make the most of your sessions, I adapt all therapeutic interventions and tools for the online format. Features such as Zoom whiteboards can be used to enhance immersion and facilitate practical exercises.

          With your consent, I can coordinate with other professionals in your healthcare network - your general practitioner, psychiatrist, dietitian, etc. - to ensure seamless and optimal care.

          ### Benefits of Online Therapy Sessions

          - **Accessibility:** Receive support without constraints of travel, health, or scheduling (e.g., chronic pain, agoraphobia, busy schedules).
          - **Flexibility:** Schedule sessions according to your routine, wherever you are.
          - **Continuity of care:** Maintain your therapy even during vacations, travel, or after relocating.
          - **Choice of professionals:** Access highly qualified specialists regardless of your location.
          - **Support for expatriates:** Find a professional who speaks your language in your host country.
          - **Confidentiality and reduced stigma:** Sessions offer a safe, private space and can reduce the social stigma associated with seeking mental health support.

          ### Points to Consider

          - **Confidentiality:** To benefit fully from online sessions, make sure you have a quiet, private space. Interruptions or lack of privacy may reduce the quality of the session.
          - **Technology:** A stable internet connection and a computer or smartphone are necessary. Technical issues may occasionally interrupt the flow of a session.
          - **Complexity of difficulties:** For certain severe or complex mental health challenges, in-person support may be recommended to ensure a thorough assessment and optimal care.

          The choice between online and in-person sessions depends on your **needs, circumstances, and goals**. Together, we will determine the format that best supports your mental health journey.
        `,
        fr: `
          Que vous traversiez une transition de vie, fassiez face à des défis à l'étranger ou cherchiez simplement un accompagnement accessible, je propose des **séances de thérapie en ligne** adaptées à votre situation.

          Je m'engage à vous offrir le même niveau élevé d'**éthique, de confidentialité et de qualité de soins** qu'en consultations en présentiel.

          Pour vous aider à tirer le meilleur parti de vos séances, j'adapte toutes mes interventions et outils thérapeutiques au format numérique. Des fonctionnalités comme le tableau blanc sur Zoom peuvent être utilisées pour renforcer l'immersion et faciliter certains exercices pratiques.

          Avec votre consentement, je peux collaborer avec d'autres professionnels de votre réseau de soins - médecin traitant, psychiatre, diététicien, etc. - afin d'assurer une coordination harmonieuse et optimale de votre prise en charge.

          ### Avantages des séances de thérapie en ligne

          - **Accessibilité :** Bénéficiez d'un accompagnement sans contraintes de déplacement, de santé ou d'emploi du temps (ex. : douleurs chroniques, agoraphobie, horaires chargés).
          - **Flexibilité :** Planifiez vos séances selon votre routine, où que vous soyez.
          - **Continuité des soins :** Maintenez le suivi même pendant les vacances, les déplacements ou après un déménagement.
          - **Choix de professionnels :** Accédez à des spécialistes qualifiés et expérimentés, indépendamment de votre lieu de résidence.
          - **Soutien aux expatriés :** Trouvez un professionnel parlant votre langue dans votre pays d'accueil.
          - **Confidentialité et réduction de la stigmatisation :** Les séances offrent un cadre sûr et privé, et peuvent réduire la gêne liée à la recherche d'aide psychologique.

          ### Points à considérer

          - **Confidentialité :** Pour tirer pleinement parti des séances, veillez à disposer d'un espace calme et privé. Les interruptions ou le manque de confidentialité peuvent réduire la qualité de la séance.
          - **Technologie :** Une connexion internet stable et un ordinateur ou smartphone sont nécessaires. Les problèmes techniques peuvent parfois interrompre le déroulement de la séance.
          - **Complexité des difficultés :** Pour certaines problématiques sévères ou complexes, un accompagnement en personne peut être recommandé afin de garantir une évaluation et un suivi optimal.

          Le choix entre séances en ligne et consultations en présentiel dépend de vos **besoins, circonstances et objectifs**. Ensemble, nous déterminerons le format le plus adapté pour soutenir votre parcours de santé mentale.
        `,
      },
    },

    {
      id: "Mindfulness",
      image: "img_mindfulness.png",
      date: "",
      slug: {
        en: "mindfulness-in-therapy",
        fr: "pleine-conscience-en-therapie",
      },
      title: {
        en: "Mindfulness in Therapy: Responding Rather Than Reacting",
        fr: "Pleine conscience en thérapie : répondre plutôt que réagir",
      },
      seo: {
        title: {
          en: "Mindfulness in Therapy: Responding Rather Than Reacting",
          fr: "La pleine conscience en thérapie : répondre plutôt que réagir",
        },
        description: {
          en: "Mindfulness as attention training rather than relaxation: how it is used within CBT and ACT, what practice involves, and what it is not.",
          fr: "La pleine conscience comme entraînement de l'attention plutôt que relaxation : son usage en TCC et en ACT, la pratique concrète, et ses malentendus.",
        },
        keywords: {
          en: [
            "mindfulness",
            "mindfulness therapy",
            "present-moment awareness",
          ],
          fr: ["pleine conscience", "mindfulness", "méditation thérapie"],
        },
      },
      text: {
        en: `
          In addition to **CBT** and **ACT**, I integrate mindfulness into therapy when it seems likely to be helpful for a client.

          I often describe mindfulness as a way of training attention. It involves bringing attention to the present moment, intentionally and with curiosity, rather than functioning on autopilot. Rather than trying to empty the mind or force relaxation, mindfulness involves noticing what is already there: **thoughts, emotions, and bodily sensations**, and learning to observe them without immediately getting carried away by them or reacting automatically.

          Our minds naturally tend to wander. Often, they move toward worries about the future, self-criticism, or replaying difficult moments from the past. Mindfulness helps us notice when attention has drifted and gently bring it back to the present moment, again and again.

          In **ACT**, mindfulness can help people observe difficult or unhelpful thoughts with more distance, rather than becoming caught up in them. In **CBT**, it can also help people become more aware of certain patterns of thinking, emotional reactions, and impulsive behaviours. Over time, this can help create more space to respond intentionally rather than reacting automatically.

          Mindfulness is a skill that develops through practice. This may involve brief guided exercises such as breathing practices, grounding exercises, or body scans, as well as bringing fuller attention to everyday activities like walking, eating, or pausing during stressful moments. In therapy, we may begin with brief exercises during sessions and, where appropriate, gradually integrate these tools into daily life between sessions.

          Research suggests that regular mindfulness practice may support attention regulation, emotional awareness, and psychological flexibility. For many people, it becomes a more **flexible and less reactive way of relating to difficult internal experiences**, rather than constantly trying to avoid, control, or struggle against them.

          Mindfulness is not about eliminating thoughts, “thinking positively,” or achieving a constant state of calm. The goal is to develop a different relationship with thoughts and emotions so that they have less automatic influence over behaviour and daily life.
        `,
        fr: `
          En complément de la **TCC** et de l'**ACT**, j'intègre la pleine conscience au travail thérapeutique lorsqu'elle semble pouvoir être utile au patient.

          Je décris souvent la pleine conscience comme une manière d'entraîner l'attention. Elle consiste à ramener son attention vers le moment présent, de manière intentionnelle et avec curiosité, plutôt que de fonctionner en pilote automatique. Il ne s'agit pas de faire le vide ni de se forcer à se détendre, mais plutôt de remarquer ce qui est déjà là : **pensées, émotions, sensations corporelles**, et d'apprendre à les observer sans se laisser automatiquement emporter par elles ni y réagir immédiatement.

          Notre esprit a naturellement tendance à vagabonder. Il se tourne souvent vers les inquiétudes liées à l'avenir, l'autocritique ou les ruminations autour d'expériences passées difficiles. La pleine conscience aide à remarquer ces moments où l'attention s'éloigne, puis à la ramener doucement vers le présent, encore et encore.

          Dans l'ACT, la pleine conscience peut aider à observer les pensées difficiles et non aidantes avec plus de distance, plutôt que de se laisser happer par elles. En TCC, elle peut également aider à mieux repérer certains schémas de pensée, réactions émotionnelles et comportements impulsifs. Avec le temps, cela permet de créer davantage d'espace pour répondre de manière plus intentionnelle.

          La pleine conscience est une compétence qui se développe avec la pratique. Cela peut prendre la forme de courts exercices guidés, comme la respiration, les exercices d'ancrage ou le scan corporel, mais aussi d'une attention plus consciente portée à des activités simples du quotidien, comme marcher, manger ou faire une pause dans des moments de stress. En thérapie, nous pouvons commencer par de brèves pratiques en séance puis, lorsque cela est pertinent, intégrer progressivement ces outils dans la vie quotidienne entre les séances.

          Les recherches suggèrent que la pratique régulière de la pleine conscience peut soutenir la régulation de l'attention, la conscience émotionnelle et la flexibilité psychologique. Pour beaucoup de personnes, cela devient une manière plus **souple et moins réactive d'entrer en relation avec les expériences internes difficiles**, plutôt que de chercher constamment à les éviter ou à les contrôler.

          La pleine conscience ne consiste pas à éliminer les pensées, à « penser positivement » ni à atteindre un état de calme permanent. L'objectif est de développer une autre manière d'entrer en relation avec ses pensées et ses émotions afin qu'elles influencent moins automatiquement les comportements et la vie quotidienne.
        `,
      },
    },

    {
      id: "post-understanding-anxiety",
      image: "blog_anxiety.jpg",
      date: "",
      slug: { en: "understanding-anxiety", fr: "comprendre-anxiete" },
      title: { en: "Understanding Anxiety", fr: "Comprendre l'anxiété" },
      seo: {
        title: {
          en: "Understanding Anxiety: Symptoms, Patterns and Treatment",
          fr: "Comprendre l'anxiété : symptômes, mécanismes et traitement",
        },
        description: {
          en: "The physical, cognitive and behavioural faces of anxiety, why avoidance maintains it, and how CBT and ACT help you respond differently.",
          fr: "Les manifestations physiques, cognitives et comportementales de l'anxiété, pourquoi l'évitement l'entretient, et comment la TCC et l'ACT aident.",
        },
        keywords: {
          en: [
            "anxiety",
            "anxiety symptoms",
            "panic attacks",
            "generalised anxiety disorder",
          ],
          fr: ["anxiété", "trouble anxieux", "attaque de panique", "TAG"],
        },
      },
      text: {
        en: `
          Anxiety is a natural human emotion that plays an important role in survival and self-protection. It helps us detect potential threats, prepare for challenges, and respond to situations that feel uncertain or demanding.

          In certain situations, anxiety can therefore be helpful and adaptive. It may increase alertness, concentration, or motivation when facing something important.

          However, when anxiety becomes too intense, persistent, or overwhelming, it can begin to interfere with daily life, relationships, work, sleep, and overall well-being. What was initially a protective response can gradually become a source of distress and exhaustion.

          Anxiety can affect people on several levels.

          ### Physical Symptoms

          Physically, anxiety may involve symptoms such as:

          - A racing heart
          - Shortness of breath
          - Muscle tension
          - Dizziness
          - Sweating
          - Fatigue
          - Gastrointestinal discomfort
          - Difficulties sleeping

          ### Cognitive Symptoms

          Cognitively, anxiety is often associated with:

          - Excessive worry
          - Intrusive thoughts
          - Catastrophising
          - Overthinking
          - Hypervigilance
          - Difficulty tolerating uncertainty

          ### Behavioural Patterns

          Behaviourally, anxiety may lead people to develop coping strategies aimed at reducing discomfort or regaining a sense of control. While understandable, some of these strategies can unintentionally maintain anxiety over time.

          This may include:

          - Avoidance
          - Reassurance-seeking
          - Excessive checking
          - Compulsive behaviours
          - Procrastination
          - Withdrawing from situations perceived as threatening

          In therapy, we work not only on reducing anxiety symptoms, but also on understanding the processes that maintain anxiety and developing more flexible ways of responding to difficult thoughts, emotions, bodily sensations, and uncertainty.

          ### Anxiety-Related Difficulties

          A wide range of anxiety-related difficulties and disorders exist, varying in intensity and impact on daily life. These may include:

          - Generalised Anxiety Disorder (GAD)
          - Social Anxiety
          - Panic Attacks
          - Health Anxiety
          - Agoraphobia
          - Specific Phobias
          - Obsessive-Compulsive Disorder (OCD)
          - Performance Anxiety
          - Separation Anxiety
          - Post-Traumatic Stress Disorder (PTSD)

          Although anxiety can feel overwhelming at times, it is possible to develop a different relationship with it. Therapy can help people better understand their anxiety, reduce the impact it has on daily life, and respond to difficult thoughts and emotions in a more flexible and compassionate way.
        `,
        fr: `
          L'anxiété est une émotion humaine naturelle qui joue un rôle important dans notre survie et notre capacité à réagir face au danger. Elle nous aide à détecter des menaces potentielles, à nous préparer à certains défis et à faire face à des situations perçues comme stressantes, incertaines ou exigeantes.

          Dans certaines situations, l'anxiété peut donc être utile et adaptative. Elle peut augmenter la vigilance, la concentration ou la mobilisation face à un enjeu important.

          Cependant, lorsque l'anxiété devient trop intense, persistante ou envahissante, elle peut commencer à avoir un impact important sur la vie quotidienne, les relations, le travail, le sommeil et le bien-être général. Ce qui était initialement une réponse de protection peut progressivement devenir une source de souffrance et d'épuisement.

          L'anxiété peut se manifester à plusieurs niveaux.

          ### Manifestations physiques

          Sur le plan physique, elle peut entraîner :

          - Des palpitations
          - Une sensation d'oppression ou de souffle court
          - Des tensions musculaires
          - Des vertiges
          - De la transpiration
          - De la fatigue
          - Des troubles gastro-intestinaux
          - Des difficultés de sommeil

          ### Manifestations au niveau des pensées

          Sur le plan psychologique, l'anxiété est souvent associée :

          - Aux inquiétudes excessives
          - Aux pensées envahissantes
          - À l'anticipation de scénarios négatifs
          - Aux ruminations
          - À l'hypervigilance
          - À une difficulté à tolérer l'incertitude

          ### Manifestations comportementales

          Sur le plan comportemental, l'anxiété peut amener à développer des stratégies visant à réduire l'inconfort ou retrouver un sentiment de contrôle. Bien que compréhensibles, certaines de ces stratégies peuvent involontairement maintenir l'anxiété à long terme.

          Cela peut inclure :

          - L'évitement
          - La recherche excessive de réassurance
          - Les vérifications répétées
          - Certains comportements compulsifs
          - La procrastination
          - Le retrait de situations perçues comme menaçantes

          En thérapie, le travail ne consiste pas uniquement à réduire les symptômes anxieux, mais aussi à mieux comprendre les mécanismes qui maintiennent l'anxiété et à développer des façons plus souples de répondre aux pensées, émotions, sensations corporelles et situations d'incertitude.

          ### Difficultés et troubles anxieux

          Il existe différents troubles et manifestations liés à l'anxiété, dont l'intensité et l'impact sur le quotidien peuvent varier :

          - Trouble anxieux généralisé (TAG)
          - Anxiété sociale
          - Attaques de panique
          - Anxiété liée à la santé
          - Agoraphobie
          - Phobies spécifiques
          - Trouble obsessionnel-compulsif (TOC)
          - Anxiété de performance
          - Anxiété de séparation
          - Trouble de stress post-traumatique (TSPT)

          Même si l'anxiété peut parfois sembler envahissante, il est possible d'apprendre à y répondre différemment. La thérapie peut aider à mieux comprendre son fonctionnement, à réduire son impact sur le quotidien et à développer des réponses plus souples face aux pensées et émotions difficiles.
        `,
      },
    },
  ],
};
