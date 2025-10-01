import React from 'react'

const navigation=[
  { href: "http://localhost:3000", text: "Home" },
  { href: "http://localhost:3000", text: "About" },
  { href: "http://localhost:3000", text: "Features" }
];

const access=[
    { href: "http://localhost:3000/register", text: "Register" },
    { href: "http://localhost:3000/login", text: "SignIn" }
  ];

  const community=[
    { href: "#", text: "Instagram" },
    { href: "#", text: "Facebook" },
    { href: "#", text: "Twitter" }
  ];

function Footer() {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pl-20">
        <div>
          <h3 className="text-md font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            {navigation.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Access Product</h3>
          <ul className="space-y-2">
            {access.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            {community.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer