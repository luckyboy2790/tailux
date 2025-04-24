import { createSafeContext } from 'utils/createSafeContext';

export const [PaginationProvider, usePaginationContext] = createSafeContext(
    'Pagination component was not found in tree'
);
