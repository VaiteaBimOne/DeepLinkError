#!/usr/bin/env bash

cat > android/app/keystore.config << EOF
keyAlias={the alias of my keystore}
keyPassword={the password for the alias}
storePassword={the password for my keystore}
EOF
