import { Search } from "lucide-react";
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      {/* Trigger Button */}
      <div
        onClick={() => setIsSearchOpen(true)}
        className="flex justify-between items-center space-x-4 px-4 py-2 bg-gray-100 rounded-md cursor-pointer"
      >
        <p className="text-sm text-gray-400">What are you looking for?</p>
        <Search className="w-5 h-5 text-gray-500" />
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-100 flex items-center justify-center"
        >
          {/* Inner Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-2xl bg-white p-6 rounded-md shadow-lg z-50 m-2"
          >
            <p className="text-center text-lg font-semibold">
             
            </p>
            <div>
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
