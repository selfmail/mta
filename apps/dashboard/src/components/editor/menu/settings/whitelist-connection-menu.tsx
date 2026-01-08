import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import Button from "@/components/base/button";
import Input from "@/components/base/input";
import * as Select from "@/components/base/select";
import { useFlowStore } from "../../store";
import { MenuLayout } from "../layout";

interface WhitelistEntry {
  id: string;
  value: string;
  type: "hostname" | "ip";
}

type WhitelistType = "hostname" | "ip";

const ipv4Schema = z
  .string()
  .regex(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    "Invalid IPv4 address"
  );

const ipv6Schema = z
  .string()
  .regex(/^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/, "Invalid IPv6 address");

const ipSchema = z.union([ipv4Schema, ipv6Schema]);

const hostnameSchema = z
  .string()
  .transform((val) => {
    // Allow wildcards like *.example.com or @domain.com
    if (val.startsWith("@") || val.startsWith("*.")) {
      return val.replace(/^[@*.]/, "");
    }
    return val;
  })
  .pipe(
    z
      .string()
      .regex(
        /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
        "Invalid hostname or domain"
      )
  );

export default function WhitelistConnectionMenu() {
  const { getSelectedNode, updateNodeData } = useFlowStore();
  const selectedNode = getSelectedNode();

  const initialWhitelist =
    (selectedNode?.data?.whitelist as WhitelistEntry[]) || [];
  const [whitelist, setWhitelist] =
    useState<WhitelistEntry[]>(initialWhitelist);
  const [newValue, setNewValue] = useState("");
  const [selectedType, setSelectedType] = useState<WhitelistType>("hostname");
  const [validationError, setValidationError] = useState("");

  const handleAddEntry = () => {
    if (!newValue.trim()) {
      setValidationError("Please enter a value");
      return;
    }

    // Validate based on type using Zod
    const schema = selectedType === "ip" ? ipSchema : hostnameSchema;
    const result = schema.safeParse(newValue.trim());

    if (!result.success) {
      setValidationError("Invalid input");
      return;
    }

    const newEntry: WhitelistEntry = {
      id: crypto.randomUUID(),
      value: newValue.trim(),
      type: selectedType,
    };

    const updatedWhitelist = [...whitelist, newEntry];
    setWhitelist(updatedWhitelist);
    setNewValue("");
    setValidationError("");

    if (selectedNode) {
      updateNodeData(selectedNode.id, { whitelist: updatedWhitelist });
    }
  };

  const handleRemoveEntry = (id: string) => {
    const updatedWhitelist = whitelist.filter((entry) => entry.id !== id);
    setWhitelist(updatedWhitelist);

    if (selectedNode) {
      updateNodeData(selectedNode.id, { whitelist: updatedWhitelist });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddEntry();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  const getPlaceholder = () => {
    if (selectedType === "ip") {
      return "192.168.1.1 or 2001:db8::1";
    }
    return "example.com or *.example.com";
  };

  return (
    <MenuLayout>
      <div className="flex flex-col space-y-4">
        <div>
          <h3 className="mb-2 font-medium text-sm">Add Entry</h3>

          <div className="mb-3">
            <label
              className="mb-1 block text-neutral-600 text-xs"
              htmlFor="type-select"
            >
              Type
            </label>
            <Select.Root
              items={[
                { value: "hostname", label: "Hostname/Domain" },
                { value: "ip", label: "IP Address" },
              ]}
              onValueChange={(value) => setSelectedType(value as WhitelistType)}
              value={selectedType}
            >
              <Select.Trigger id="type-select">
                <Select.Value />
                <Select.Icon>
                  <ChevronDown className="h-4 w-4" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <Select.List>
                      <Select.Item value="hostname">
                        <Select.ItemText>Hostname/Domain</Select.ItemText>
                      </Select.Item>
                      <Select.Item value="ip">
                        <Select.ItemText>IP Address</Select.ItemText>
                      </Select.Item>
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={getPlaceholder()}
                type="text"
                value={newValue}
              />
              {validationError && (
                <p className="mt-1 text-red-500 text-xs">{validationError}</p>
              )}
            </div>
            <Button
              className="shrink-0"
              onClick={handleAddEntry}
              size="icon"
              variant="ghost"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-sm">Whitelisted Entries</h3>
          {whitelist.length === 0 ? (
            <p className="text-neutral-500 text-sm">No entries yet</p>
          ) : (
            <div className="flex flex-col space-y-2">
              {whitelist.map((entry) => (
                <div
                  className="flex items-center justify-between rounded-lg border border-(--border) bg-(--card-background) p-2"
                  key={entry.id}
                >
                  <div className="flex flex-col truncate">
                    <span className="truncate text-sm">{entry.value}</span>
                    <span className="text-neutral-500 text-xs capitalize">
                      {entry.type}
                    </span>
                  </div>
                  <button
                    aria-label="Remove entry"
                    className="shrink-0 rounded p-1 transition-colors hover:bg-neutral-100"
                    onClick={() => handleRemoveEntry(entry.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4 text-neutral-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MenuLayout>
  );
}
