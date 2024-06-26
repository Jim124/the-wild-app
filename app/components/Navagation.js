import Link from 'next/link';

function Navagation() {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/cabins'}>Cabins</Link>
        </li>
        <li>
          <Link href={'/account'}>Account</Link>
        </li>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navagation;
