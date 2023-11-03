declare module '@noomorph/vfile-reporter-position' {
	import type { Reporter, ReporterSettings } from 'vfile';

	export const reporter: Reporter<ReporterSettings>;
	export default reporter;
}
