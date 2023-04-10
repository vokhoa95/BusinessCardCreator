import { NavigationStackProps, Screen } from '../App'

/** Screen Props
 *
 * All the screens in the application will share these common screen props, this file aggregates
 * them into a single interface that can be extended on the different screens.
 */
export interface ScreenProps<T extends Screen> extends NavigationStackProps<T> {}
