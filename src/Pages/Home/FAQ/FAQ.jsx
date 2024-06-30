import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const FAQ = () => {
  const faqs = [
    {
      _id: 1,
      Question: "Where can I turn in old phones for cash?",
      Answer: `In Bangladesh there are many websites to sell your old mobile phone for cash but if your are looking for reliability then Buy & Sell is most trusted platform to sell your mobile for instant cash.`,
    },
    {
      _id: 2,
      Question: "How can I sell my old cell phone?",
      Answer: `After visiting the Buy & Sell website or app, select the product category you want to sell. Suppose you want to sell your mobile phone - click on the mobile section, select the brand, select the variant and answer a few questions about the state of the device. That's it. After that, Buy & Sell will generate its quote and if you like the price, we will deliver the money to your home and collect your old device.`,
    },
    {
      _id: 3,
      Question: "What do you do with my old phone?",
      Answer:
        "Once a phone is sold to us, we refurbish it and rectify whatever issues it might have. Following which, we sell these devices to retailers so that they can be further sold to customers looking to buy second-hand devices.",
    },
  ];

  return (
    <div className="mx-5 my-20">
      <h2 className="text-2xl font-bold text-slate-700 mb-5 text-center">
        FAQS
      </h2>
      <div className="w-full max-w-4xl mx-auto">
        {faqs.map((faq) => (
          <Disclosure as="div" className="mt-4 bg-slate-100" key={faq._id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2  text-lg font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span className="font-semibold">{faq.Question}</span>
                  <ChevronUpIcon
                    className={`${open && "rotate-180 transform"} h-5 w-5`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 text-md">
                  {faq.Answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
