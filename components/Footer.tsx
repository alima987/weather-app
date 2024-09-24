import Link from 'next/link';
export default function Footer() {
    return ( 
        <div className="bg-gray-800 text-white text-center py-4" >
            <Link 
            href="https://github.com/alima987" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-500 hover:underline">
            alima987
            </Link>
        </div>
    )
}