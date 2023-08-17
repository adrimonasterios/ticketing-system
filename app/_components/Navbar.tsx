"use client";
import { Fragment, PropsWithChildren, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/_utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Admin", href: "/tickets" },
];

const Navbar = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      <Disclosure as="nav" className="bg-background-400 shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://media.licdn.com/dms/image/D560BAQHnjXD2dFDIew/company-logo_200_200/0/1688573440117?e=1700092800&v=beta&t=KIyWunYciiVaO1n2oI-4bu7hMWuS0GoypevvQ93Pr2Y"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((route, index) => (
                      <Link
                        key={`route-${index}`}
                        href={route.href}
                        className={classNames(
                          "inline-flex items-center px-1 pt-1 text-sm ",
                          pathname === route.href
                            ? "font-medium text-text-400 border-b-2 border-primary-400"
                            : ""
                        )}
                      >
                        {route.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((route, index) => (
                  <Disclosure.Button
                    key={`route-${index}`}
                    as="a"
                    href={route.href}
                    className={classNames(
                      "block border-l-4  py-2 pl-3 pr-4 text-base ",
                      route.href === pathname
                        ? "font-medium text-primary-400 border-primary-400 bg-background-400"
                        : ""
                    )}
                  >
                    {route.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      tom@example.com
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="p-12">
        <div className="max-w-7xl w-full">{children}</div>
      </div>
    </>
  );
};

export default Navbar;
