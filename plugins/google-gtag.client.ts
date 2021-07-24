export default function (): void {
  const consent: boolean = (localStorage.getItem('consent') ?? 'false') === 'false';
  // Add any other tracking schemes here. Hopefully I can find a simple way to iterate all of them.
  (window as any)['ga-disable-G-26CN947SSZ'] = consent;
  (window as any)['ga-disable-UA-153189507-4'] = consent;
}
