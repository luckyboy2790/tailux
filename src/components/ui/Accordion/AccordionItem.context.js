import { createSafeContext } from 'utils/createSafeContext';

export const [AccordionItemContextProvider, useAccordionItemContext] =
    createSafeContext("useAccordionItemContext must be used within AccordionItemProvider");
