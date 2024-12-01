# Domain Ids

Prefixed, easy to copy and smaller UUID :
`demo_1QeKsBzHPomv4PSB8yfypB`

## Usage

### Generate a random domain id

```javascript
import { Id } from "@indiebackend/domain-ids";

Id.generate("demo"); // demo_1QeKsBzHPomv4PSB8yfypB
```

### Encode an existing UUID

```javascript
import { Id } from "@indiebackend/domain-ids";

Id.encode("demo", "84d568f6-f291-483d-83a9-6d2add7612d9"); // demo_1QeKsBzHPomv4PSB8yfypB
```

### Decode a domain id into a UUID

```javascript
import { Id } from "@indiebackend/domain-ids";

Id.decode("demo_1QeKsBzHPomv4PSB8yfypB"); // 84d568f6-f291-483d-83a9-6d2add7612d9
```

### Validate a domain id

Returns true if the domain id has the correct prefix and correctly decodes into a UUID

```javascript
import { Id } from "@indiebackend/domain-ids";

Id.validate("demo", "demo_1QeKsBzHPomv4PSB8yfypB"); // true
Id.validate("invalid", "demo_1QeKsBzHPomv4PSB8yfypB"); // false
Id.validate("demo", "demo_notvalid"); // false
```
