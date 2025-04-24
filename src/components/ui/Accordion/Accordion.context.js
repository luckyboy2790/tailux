import { createSafeContext } from 'utils/createSafeContext';

export const [AccordionContextProvider, useAccordionContext] = createSafeContext(
    "useAccordionContext must be used within AccordionProvider"
);
