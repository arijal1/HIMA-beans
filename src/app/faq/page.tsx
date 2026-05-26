'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLang } from '@/context/lang';

/* ─────────────────────────────────────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────────────────────────────────────── */

type Category = 'About Our Coffee' | 'Ordering & Shipping' | 'Wholesale' | 'Sustainability';

interface FAQItem {
  question: string;
  questionNP: string;
  answer: string;
  answerNP: string;
}

const FAQ_DATA: Record<Category, FAQItem[]> = {
  'About Our Coffee': [
    {
      question: 'Where is your coffee sourced?',
      questionNP: 'तपाईंको कफी कहाँबाट ल्याइन्छ?',
      answer:
        'All HIMA BEANS coffee is single-origin, sourced directly from small family farms across Nepal\'s Himalayan growing regions — primarily Gulmi, Palpa, Syangja, Kavre, Nuwakot, and Lalitpur. We have direct trade relationships with each farm and visit origin at least twice annually.',
      answerNP:
        'सबै HIMA BEANS कफी एकल-उत्पत्ति हो, नेपालका हिमालयन उत्पादन क्षेत्रहरूमा — मुख्यतः गुल्मी, पाल्पा, स्याङ्जा, काभ्रे, नुवाकोट र ललितपुरका साना पारिवारिक खेतहरूबाट सिधै स्रोत गरिएको। हामीसँग प्रत्येक खेतसँग प्रत्यक्ष व्यापार सम्बन्ध छ र वार्षिक कम्तिमा दुई पटक उत्पत्ति भ्रमण गर्छौं।',
    },
    {
      question: 'What makes Nepali coffee special?',
      questionNP: 'नेपाली कफी विशेष किन छ?',
      answer:
        'Nepal\'s Himalayan altitude (1,000–2,100m) creates exceptional growing conditions. The cool air slows cherry maturation, concentrating sugars and building complex flavour structures impossible at lower altitudes. The result: a cup with floral aromatics, dark chocolate body, citrus brightness, and almost no bitterness. Nepal is one of specialty coffee\'s most exciting emerging origins.',
      answerNP:
        'नेपालको हिमालयन उचाइ (१,०००–२,१०० मि.) असाधारण उत्पादन अवस्थाहरू सिर्जना गर्छ। चिसो हावाले चेरीको परिपक्वता ढिलो गर्छ, चिनी संकेन्द्रित गर्छ र तल्लो उचाइमा असम्भव जटिल स्वाद संरचनाहरू निर्माण गर्छ। परिणाम: फूलयुक्त सुगन्ध, गाढा चकलेट बडी, सिट्रस उज्यालो र लगभग कुनै तितोपन नभएको कप। नेपाल स्पेशल्टी कफीका सबैभन्दा रोमाञ्चक उभरन्दो उत्पत्तिहरूमध्ये एक हो।',
    },
    {
      question: 'What roast profiles do you offer?',
      questionNP: 'तपाईंहरू कुन रोस्ट प्रोफाइलहरू प्रदान गर्नुहुन्छ?',
      answer:
        'We offer Light, Medium-Light, Medium, and Dark roast profiles depending on the bean. Each origin is roasted to bring out its natural character — our Gulmi beans shine at light roast for their floral clarity, while our Syangja honey-process beans are developed darker to unlock their cocoa depth.',
      answerNP:
        'हामी बिनको आधारमा लाइट, मिडियम-लाइट, मिडियम र डार्क रोस्ट प्रोफाइलहरू प्रदान गर्छौं। प्रत्येक उत्पत्तिलाई आफ्नो प्राकृतिक चरित्र बाहिर ल्याउनको लागि रोस्ट गरिन्छ — हाम्रा गुल्मी बिनहरू फूलयुक्त स्पष्टताको लागि लाइट रोस्टमा चम्किन्छन्, जबकि हाम्रा स्याङ्जा हनी-प्रोसेस बिनहरू कोको गहिराइ खोल्न गाढा विकसित गरिन्छन्।',
    },
    {
      question: 'Are your beans single origin?',
      questionNP: 'तपाईंका बिनहरू एकल उत्पत्ति हुन्?',
      answer:
        'Most of our range is single-origin, traceable to a specific farm and harvest lot. We also offer a carefully crafted Heritage Blend that combines beans from multiple regions for a balanced, approachable everyday cup without sacrificing quality.',
      answerNP:
        'हाम्रो अधिकांश दायरा एकल-उत्पत्ति हो, एक विशिष्ट खेत र कटाइ लटसम्म ट्रेस गर्न सकिन्छ। हामी बहु क्षेत्रहरूका बिनहरूलाई संयोजन गर्ने सावधानीपूर्वक बनाइएको हेरिटेज ब्लेन्ड पनि प्रदान गर्छौं जुन गुणस्तर त्याग नगरी सन्तुलित, पहुँचयोग्य दैनिक कप दिन्छ।',
    },
    {
      question: 'What certifications do you have?',
      questionNP: 'तपाईंहरूसँग कुन प्रमाणपत्रहरू छन्?',
      answer:
        'Our supply chain is audited annually for fair trade compliance, and we are working towards formal Rainforest Alliance and Fair Trade certification. All our farming partners are independently verified for sustainable practices, and we publish full traceability reports for each harvest lot.',
      answerNP:
        'हाम्रो आपूर्ति श्रृंखला फेयर ट्रेड अनुपालनको लागि वार्षिक रूपमा लेखापरीक्षण गरिन्छ, र हामी औपचारिक रेनफोरेस्ट एलायन्स र फेयर ट्रेड प्रमाणीकरणतर्फ काम गर्दैछौं। हाम्रा सबै खेती साझेदारहरू दिगो अभ्यासहरूको लागि स्वतन्त्र रूपमा प्रमाणित छन्, र हामी प्रत्येक कटाइ लटको लागि पूर्ण ट्रेसेबिलिटी रिपोर्टहरू प्रकाशित गर्छौं।',
    },
  ],
  'Ordering & Shipping': [
    {
      question: 'Do you ship across Australia?',
      questionNP: 'के तपाईंहरू अस्ट्रेलियाभर पठाउनुहुन्छ?',
      answer:
        'Yes — we ship to all Australian states and territories. Standard shipping is via Australia Post eParcel, and express options are available at checkout. We use specialty coffee packaging with one-way degassing valves to preserve freshness during transit.',
      answerNP:
        'हो — हामी सबै अस्ट्रेलियन राज्य र क्षेत्रहरूमा पठाउँछौं। मानक ढुवानी अस्ट्रेलिया पोस्ट ईपार्सेल मार्फत हो, र एक्सप्रेस विकल्पहरू चेकआउटमा उपलब्ध छन्। ट्रान्जिटको क्रममा ताजगी जोगाउन हामी एकतर्फी डिग्यासिङ भाल्भहरू भएका स्पेशल्टी कफी प्याकेजिङ प्रयोग गर्छौं।',
    },
    {
      question: 'What are shipping times?',
      questionNP: 'ढुवानीको समय कति हो?',
      answer:
        'Standard shipping typically takes 3–7 business days depending on your location. Express shipping is 1–3 business days. We roast to order on Tuesdays and Fridays, so your beans arrive at peak freshness — usually within 3–10 days of roasting.',
      answerNP:
        'मानक ढुवानी सामान्यतया तपाईंको स्थानको आधारमा ३–७ कार्य दिन लिन्छ। एक्सप्रेस ढुवानी १–३ कार्य दिन हो। हामी मंगलबार र शुक्रबारमा अर्डरको लागि रोस्ट गर्छौं, त्यसैले तपाईंका बिनहरू उच्चतम ताजगीमा आइपुग्छन् — सामान्यतः रोस्टिङको ३–१० दिनभित्र।',
    },
    {
      question: 'Do you offer subscriptions?',
      questionNP: 'के तपाईंहरू सदस्यता प्रदान गर्नुहुन्छ?',
      answer:
        'Yes — our subscription program is one of our most popular offerings. Choose your preferred bean, grind size, quantity, and frequency (weekly, fortnightly, or monthly). Subscribers receive 10% off every order and are first to access limited seasonal lots. You can pause, skip, or cancel any time.',
      answerNP:
        'हो — हाम्रो सदस्यता कार्यक्रम हाम्रो सबैभन्दा लोकप्रिय अफरहरूमध्ये एक हो। तपाईंको मनपर्ने बिन, पिस्ने साइज, मात्रा र आवृत्ति (साप्ताहिक, पाक्षिक वा मासिक) छान्नुहोस्। सदस्यहरूले प्रत्येक अर्डरमा १०% छुट पाउँछन् र सीमित मौसमी लटहरूमा पहिलो पहुँच पाउँछन्। तपाईं जुनसुकै समय रोक्न, छोड्न वा रद्द गर्न सक्नुहुन्छ।',
    },
    {
      question: "What's your minimum order?",
      questionNP: 'न्यूनतम अर्डर कति हो?',
      answer:
        'For retail orders, there is no minimum — you can order a single 250g bag. For wholesale accounts, minimum order quantities apply depending on your tier (see Wholesale page for details).',
      answerNP:
        'खुद्रा अर्डरको लागि, कुनै न्यूनतम छैन — तपाईं एउटा मात्र २५० ग्राम झोला अर्डर गर्न सक्नुहुन्छ। थोक खाताहरूको लागि, तपाईंको टियरको आधारमा न्यूनतम अर्डर मात्राहरू लागू हुन्छन् (विवरणको लागि थोक पृष्ठ हेर्नुहोस्)।',
    },
    {
      question: 'What is your returns policy?',
      questionNP: 'तपाईंको फिर्ता नीति के हो?',
      answer:
        'If you\'re not completely satisfied with your purchase, contact us within 14 days and we\'ll offer a replacement or full refund — no questions asked. Coffee is a sensory product and we stand behind every bag we ship.',
      answerNP:
        'यदि तपाईं आफ्नो खरिदसँग पूर्णतः सन्तुष्ट हुनुहुन्न भने, १४ दिनभित्र हामीलाई सम्पर्क गर्नुहोस् र हामी प्रतिस्थापन वा पूर्ण फिर्ता प्रदान गर्नेछौं — कुनै प्रश्न सोधिने छैन। कफी एउटा संवेदनात्मक उत्पादन हो र हामी पठाउने प्रत्येक झोलाको पछाडि उभिन्छौं।',
    },
  ],
  'Wholesale': [
    {
      question: 'What is the minimum order quantity for wholesale?',
      questionNP: 'थोकको लागि न्यूनतम अर्डर मात्रा कति हो?',
      answer:
        'Wholesale accounts start from 5kg per order. Our Starter tier covers 5–20kg/month, Professional 20–100kg/month, and Enterprise 100kg+. All wholesale pricing is available on our Wholesale page or by contacting our team directly.',
      answerNP:
        'थोक खाताहरू प्रति अर्डर ५ किलोग्रामबाट सुरु हुन्छन्। हाम्रो स्टार्टर टियर ५–२०किलो/महिना, प्रोफेसनल २०–१०० किलो/महिना र एन्टरप्राइज १०० किलो+ समेट्छ। सबै थोक मूल्य निर्धारण हाम्रो थोक पृष्ठमा वा सिधै हाम्रो टोलीलाई सम्पर्क गरेर उपलब्ध छ।',
    },
    {
      question: 'Can we get custom roasting?',
      questionNP: 'के हामी कस्टम रोस्टिङ पाउन सक्छौं?',
      answer:
        'Absolutely. Professional and Enterprise accounts can work with our roaster to develop bespoke roast profiles that match their café\'s house style. We also offer custom label packaging for Enterprise partners — your brand, our beans.',
      answerNP:
        'निश्चय नै। प्रोफेसनल र एन्टरप्राइज खाताहरूले हाम्रो रोस्टरसँग काम गरेर आफ्नो क्याफेको हाउस स्टाइलसँग मेल खाने विशेष रोस्ट प्रोफाइलहरू विकसित गर्न सक्छन्। हामी एन्टरप्राइज साझेदारहरूको लागि कस्टम लेबल प्याकेजिङ पनि प्रदान गर्छौं — तपाईंको ब्रान्ड, हाम्रा बिनहरू।',
    },
    {
      question: 'What is the lead time from Nepal?',
      questionNP: 'नेपालबाट लिड टाइम कति हो?',
      answer:
        'We maintain a 3–6 month buffer of green bean inventory in our Melbourne facility, so you\'re ordering from stock that\'s already in Australia. Fresh lots typically arrive from Nepal twice per year. Roasted-to-order turnaround is 2–3 business days for wholesale orders.',
      answerNP:
        'हामी हाम्रो मेलबर्न सुविधामा हरिया बिन सूची को ३–६ महिनाको बफर कायम राख्छौं, त्यसैले तपाईं पहिल्यै अस्ट्रेलियामा रहेको स्टकबाट अर्डर गर्दै हुनुहुन्छ। ताजा लटहरू सामान्यतः वर्षमा दुई पटक नेपालबाट आइपुग्छन्। थोक अर्डरको लागि रोस्टेड-टू-अर्डर टर्नअराउन्ड २–३ कार्य दिन हो।',
    },
    {
      question: 'Do you offer exclusivity arrangements?',
      questionNP: 'के तपाईंहरू एकाधिकार व्यवस्था प्रदान गर्नुहुन्छ?',
      answer:
        'For Enterprise accounts, we can discuss geographic exclusivity arrangements for specific single-origin lots. This means no other café in your postcode area will carry that particular bean. Contact us to discuss what\'s possible.',
      answerNP:
        'एन्टरप्राइज खाताहरूको लागि, हामी विशिष्ट एकल-उत्पत्ति लटहरूको लागि भौगोलिक एकाधिकार व्यवस्थाहरू छलफल गर्न सक्छौं। यसको अर्थ तपाईंको पोस्टकोड क्षेत्रमा कुनै अन्य क्याफेले त्यो विशेष बिन राख्नेछैन। के सम्भव छ छलफल गर्न हामीलाई सम्पर्क गर्नुहोस्।',
    },
    {
      question: 'How does wholesale pricing work?',
      questionNP: 'थोक मूल्य निर्धारण कसरी काम गर्छ?',
      answer:
        'Wholesale pricing is tiered by volume — the more you order, the better the per-kg rate. We offer 30-day payment terms for established accounts. Pricing is available on our Wholesale page or by requesting a quote from our team.',
      answerNP:
        'थोक मूल्य निर्धारण मात्राद्वारा टियर गरिएको छ — जति धेरै अर्डर गर्नुहुन्छ, प्रति-किलो दर उति राम्रो। हामी स्थापित खाताहरूको लागि ३०-दिनको भुक्तानी सर्तहरू प्रदान गर्छौं। मूल्य निर्धारण हाम्रो थोक पृष्ठमा वा हाम्रो टोलीबाट उद्धरण अनुरोध गरेर उपलब्ध छ।',
    },
  ],
  'Sustainability': [
    {
      question: 'Are your beans ethically sourced?',
      questionNP: 'के तपाईंका बिनहरू नैतिक रूपमा स्रोत गरिएका छन्?',
      answer:
        'Ethical sourcing is the foundation of everything we do. We pay a significant premium above commodity and Fair Trade floor prices directly to farmers, bypassing unnecessary intermediaries. Every farming partner is visited in person and every transaction is documented.',
      answerNP:
        'नैतिक स्रोत प्राप्ति हामी गर्ने सबै कुराको आधार हो। हामी अनावश्यक बिचौलियाहरूलाई छोडेर किसानहरूलाई सिधै वस्तु र फेयर ट्रेड तल्लो मूल्यभन्दा महत्वपूर्ण प्रिमियम तिर्छौं। प्रत्येक खेती साझेदारलाई व्यक्तिगत रूपमा भ्रमण गरिन्छ र प्रत्येक लेनदेन कागजात गरिन्छ।',
    },
    {
      question: 'How are farmers compensated?',
      questionNP: 'किसानहरूलाई कसरी क्षतिपूर्ति दिइन्छ?',
      answer:
        'Farmers receive a direct premium of 40–60% above commodity price. We also invest in community infrastructure — water access, processing equipment, and educational resources — as part of our long-term farm partnership model. Farmer wellbeing is a business priority, not an afterthought.',
      answerNP:
        'किसानहरूले वस्तु मूल्यभन्दा ४०–६०% प्रत्यक्ष प्रिमियम पाउँछन्। हामी समुदायिक पूर्वाधारमा पनि लगानी गर्छौं — पानी पहुँच, प्रशोधन उपकरण र शैक्षिक स्रोतहरू — हाम्रो दीर्घकालीन खेत साझेदारी मोडेलको भागको रूपमा। किसानको कल्याण व्यापार प्राथमिकता हो, पछि सोचिने कुरा होइन।',
    },
    {
      question: 'What is your environmental impact?',
      questionNP: 'तपाईंहरूको वातावरणीय प्रभाव के हो?',
      answer:
        'Our coffee is shade-grown under native forest canopy, which preserves biodiversity and prevents soil erosion. We use fully recyclable and compostable packaging. Our Melbourne operations run on 100% green electricity, and we carbon-offset all international freight.',
      answerNP:
        'हाम्रो कफी देशी वन आवरण मुनि छाया-उब्जाइन्छ, जसले जैविक विविधता जोगाउँछ र माटो कटान रोक्छ। हामी पूर्णतः पुनर्चक्रण र कम्पोस्ट गर्न सकिने प्याकेजिङ प्रयोग गर्छौं। हाम्रो मेलबर्न कार्यहरू १००% हरित बिजुलीमा चल्छन्, र हामी सबै अन्तर्राष्ट्रिय ढुवानीको कार्बन अफसेट गर्छौं।',
    },
    {
      question: 'Is your packaging recyclable?',
      questionNP: 'के तपाईंको प्याकेजिङ पुनर्चक्रण गर्न सकिन्छ?',
      answer:
        'Yes. Our retail bags are made from kraft paper with a compostable inner liner. The one-way degassing valve is also compostable. Wholesale packaging uses reusable grain bags. We\'re committed to eliminating all virgin plastic from our supply chain by 2026.',
      answerNP:
        'हो। हाम्रा खुद्रा झोलाहरू कम्पोस्टयोग्य भित्री लाइनरसहित क्राफ्ट पेपरबाट बनेका छन्। एकतर्फी डिग्यासिङ भाल्भ पनि कम्पोस्टयोग्य छ। थोक प्याकेजिङले पुन: प्रयोगयोग्य अन्न झोलाहरू प्रयोग गर्छ। हामी २०२६ सम्म हाम्रो आपूर्ति श्रृंखलाबाट सबै भर्जिन प्लास्टिक हटाउन प्रतिबद्ध छौं।',
    },
    {
      question: 'How do you verify fair trade practices?',
      questionNP: 'तपाईंहरू फेयर ट्रेड अभ्यासहरू कसरी प्रमाणित गर्नुहुन्छ?',
      answer:
        'Beyond third-party certification, we conduct annual on-site audits of every partner farm. We document labour practices, wage levels, and working conditions. Our full sustainability report — including farm-level data — is published each year on our website and available to wholesale partners.',
      answerNP:
        'तेस्रो-पक्ष प्रमाणीकरणभन्दा बाहिर, हामी प्रत्येक साझेदार खेतको वार्षिक साइट-मा लेखापरीक्षण सञ्चालन गर्छौं। हामी श्रम अभ्यासहरू, ज्यालाको स्तर र काम गर्ने अवस्थाहरू कागजात गर्छौं। हाम्रो पूर्ण दिगोपन रिपोर्ट — खेत-स्तर डेटा सहित — प्रत्येक वर्ष हाम्रो वेबसाइटमा प्रकाशित गरिन्छ र थोक साझेदारहरूलाई उपलब्ध हुन्छ।',
    },
  ],
};

const CATEGORIES = Object.keys(FAQ_DATA) as Category[];

const CATEGORY_LABELS: Record<Category, { EN: string; NP: string }> = {
  'About Our Coffee': { EN: 'About Our Coffee', NP: 'हाम्रो कफीको बारेमा' },
  'Ordering & Shipping': { EN: 'Ordering & Shipping', NP: 'अर्डर र ढुवानी' },
  'Wholesale': { EN: 'Wholesale', NP: 'थोक' },
  'Sustainability': { EN: 'Sustainability', NP: 'दिगोपन' },
};

/* ─────────────────────────────────────────────────────────────────────────────
   Accordion Item
───────────────────────────────────────────────────────────────────────────── */

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  lang,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  lang: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{ borderBottom: '1px solid rgba(31,77,79,0.1)' }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          gap: '1rem',
          minHeight: '56px',
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: '#1F4D4F',
            fontWeight: 600,
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {lang === 'EN' ? item.question : item.questionNP}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '1.5px solid #D4A55A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1V9M1 5H9" stroke="#D4A55A" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '1.5rem',
                color: '#6B7F7E',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                maxWidth: '680px',
              }}
            >
              {lang === 'EN' ? item.answer : item.answerNP}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */

export default function FAQPage() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<Category>('About Our Coffee');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <>
      <Navigation />

      <main style={{ background: '#F6F1E9', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#1F4D4F', padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,165,90,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-[clamp(1.25rem,5vw,3rem)] text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(217,223,220,0.45)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1rem' }}
            >
              {lang === 'EN' ? 'Help & Support' : 'सहायता र समर्थन'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 700,
                color: '#F6F1E9',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}
            >
              {lang === 'EN' ? 'Frequently Asked Questions' : 'बारम्बार सोधिने प्रश्नहरू'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ color: 'rgba(217,223,220,0.65)', fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {lang === 'EN'
                ? 'Everything you need to know about HIMA BEANS — from sourcing to shipping.'
                : 'हाम्रो कफी, अर्डर र साझेदारीका बारेमा तपाईंका जिज्ञासाहरूका जवाफहरू।'}
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: 'clamp(2.5rem, 5vw, 5rem) 0 clamp(4rem, 8vw, 8rem)' }}>
          <div className="max-w-3xl mx-auto px-[clamp(1.25rem,5vw,3rem)]">
            {/* Category tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.25rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(31,77,79,0.1)',
                paddingBottom: '0',
                overflowX: 'auto',
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '0.875rem 1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: activeCategory === cat ? 600 : 400,
                    color: activeCategory === cat ? '#1F4D4F' : '#6B7F7E',
                    borderBottom: activeCategory === cat ? '2px solid #D4A55A' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    marginBottom: '-1px',
                    whiteSpace: 'nowrap',
                    minHeight: '44px',
                  }}
                >
                  {CATEGORY_LABELS[cat][lang as 'EN' | 'NP']}
                </button>
              ))}
            </div>

            {/* FAQ items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              >
                {FAQ_DATA[activeCategory].map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                    lang={lang}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Still have questions? */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                marginTop: 'clamp(2.5rem, 5vw, 5rem)',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                background: '#1F4D4F',
                borderRadius: '0',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#F6F1E9', marginBottom: '0.75rem', fontWeight: 600 }}>
                {lang === 'EN' ? 'Still have questions?' : 'अझै प्रश्नहरू छन्?'}
              </h3>
              <p style={{ color: 'rgba(217,223,220,0.65)', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                {lang === 'EN'
                  ? 'Our team is always happy to help. Reach out and we\'ll get back to you within one business day.'
                  : 'हाम्रो टोली सधैं मद्दत गर्न खुसी छ। सम्पर्क गर्नुहोस् र हामी एक कार्य दिनभित्र तपाईंकहाँ फर्कनेछौं।'}
              </p>
              <a
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '0.8rem 2rem',
                  background: '#D9DFDC',
                  color: '#1F4D4F',
                  borderRadius: '0',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  transition: 'background 0.2s ease',
                }}
              >
                {lang === 'EN' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
